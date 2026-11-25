import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import type { QualityMode, SectionId } from '../types/portfolio';

interface SectionChoreography {
  cameraPos: THREE.Vector3;
  coreDesktopOffset: THREE.Vector3;
  coreMobileOffset: THREE.Vector3;
  spinMultiplier: number;
  rimCyan: number;
  rimMagenta: number;
  rimIndigo: number;
}

const CHOREOGRAPHY: Record<SectionId, SectionChoreography> = {
  hero: {
    cameraPos: new THREE.Vector3(0, 0.3, 7.1),
    coreDesktopOffset: new THREE.Vector3(1.85, 0.05, 0),
    coreMobileOffset: new THREE.Vector3(0, 0.75, -0.8),
    spinMultiplier: 1.0,
    rimCyan: 2.6,
    rimMagenta: 2.2,
    rimIndigo: 2.8,
  },
  work: {
    cameraPos: new THREE.Vector3(-0.6, 0.75, 8.6),
    coreDesktopOffset: new THREE.Vector3(-2.1, 0.45, -1.6),
    coreMobileOffset: new THREE.Vector3(0, 0.6, -2.0),
    spinMultiplier: 0.65,
    rimCyan: 3.4,
    rimMagenta: 1.2,
    rimIndigo: 2.0,
  },
  architecture: {
    cameraPos: new THREE.Vector3(0.55, -0.35, 7.8),
    coreDesktopOffset: new THREE.Vector3(2.15, -0.15, -1.1),
    coreMobileOffset: new THREE.Vector3(0, 0.1, -1.6),
    spinMultiplier: 1.35,
    rimCyan: 1.8,
    rimMagenta: 1.8,
    rimIndigo: 3.8,
  },
  contact: {
    cameraPos: new THREE.Vector3(0, 0.15, 6.9),
    coreDesktopOffset: new THREE.Vector3(0, 0.25, -1.2),
    coreMobileOffset: new THREE.Vector3(0, 0.35, -1.4),
    spinMultiplier: 0.75,
    rimCyan: 2.4,
    rimMagenta: 3.1,
    rimIndigo: 2.2,
  },
};

// Module-scope reusable scratch objects — zero GC inside the render loop
const _dummy = new THREE.Object3D();
const _targetCam = new THREE.Vector3();
const _targetCore = new THREE.Vector3();
const _colorA = new THREE.Color('#6366F1');
const _colorB = new THREE.Color('#00F5D4');
const _colorC = new THREE.Color('#EC4899');
const _colorD = new THREE.Color('#94A3B8');

const PARTICLE_COUNT_HIGH = 450;
const PARTICLE_COUNT_ECO = 200;

interface ParticleSeed {
  radius: number;
  theta: number;
  phi: number;
  speed: number;
  scale: number;
  phase: number;
}

export class PortfolioScene {
  private container: HTMLElement;
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private controls: OrbitControls;
  private envTexture: THREE.Texture;

  private coreGroup: THREE.Group;
  private crystalCore: THREE.Mesh;
  private wireIcosahedron: THREE.Mesh;
  private ringCyan: THREE.Group;
  private ringMagenta: THREE.Group;
  private ringIndigo: THREE.Group;

  private particles: THREE.InstancedMesh;
  private particleSeeds: ParticleSeed[] = [];

  private keyLight: THREE.DirectionalLight;
  private cyanLight: THREE.PointLight;
  private magentaLight: THREE.PointLight;
  private indigoLight: THREE.PointLight;

  private disposables: Array<{ dispose: () => void }> = [];

  private isSoftwareGl: boolean;
  private qualityMode: QualityMode = 'high';
  private activeSection: SectionId = 'hero';
  private userDragging = false;
  private isTabHidden = false;
  private contextLost = false;
  private prefersReducedMotion = false;

  private mouseNdcX = 0;
  private mouseNdcY = 0;
  private frameId = 0;
  private clock = new THREE.Clock();
  private elapsed = 0;
  private currentSpin = 1.0;

  private onPointerMoveBound: (e: PointerEvent) => void;
  private onResizeBound: () => void;
  private onVisibilityChangeBound: () => void;
  private onContextLostBound: (e: Event) => void;
  private onContextRestoredBound: () => void;

  constructor(container: HTMLElement, initialQuality: QualityMode = 'high') {
    this.container = container;
    this.qualityMode = initialQuality;
    this.prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.isSoftwareGl = PortfolioScene.detectSoftwareWebGL();

    this.renderer = new THREE.WebGLRenderer({
      antialias: !this.isSoftwareGl && initialQuality === 'high',
      powerPreference: 'high-performance',
      alpha: true,
    });
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;
    this.applyPixelRatio();

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    this.renderer.setSize(width, height);
    this.renderer.domElement.style.display = 'block';
    this.renderer.domElement.style.width = '100%';
    this.renderer.domElement.style.height = '100%';
    container.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x06060a);
    this.scene.fog = new THREE.FogExp2(0x06060a, 0.028);

    const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
    const roomEnv = new RoomEnvironment();
    this.envTexture = pmremGenerator.fromScene(roomEnv, 0.04).texture;
    this.scene.environment = this.envTexture;
    roomEnv.dispose();
    pmremGenerator.dispose();
    this.disposables.push(this.envTexture);

    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    this.camera.position.copy(CHOREOGRAPHY.hero.cameraPos);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = !this.isSoftwareGl;
    this.controls.dampingFactor = 0.055;
    this.controls.enableZoom = false; // Preserve smooth page scrolling
    this.controls.enablePan = false;
    this.controls.rotateSpeed = 0.65;
    this.controls.minPolarAngle = Math.PI * 0.2;
    this.controls.maxPolarAngle = Math.PI * 0.8;

    this.controls.addEventListener('start', () => {
      this.userDragging = true;
    });
    this.controls.addEventListener('end', () => {
      this.userDragging = false;
    });

    // 3-Point Studio Lighting + Cool Hemisphere Fill
    const hemiLight = new THREE.HemisphereLight(0xa5b4fc, 0x09090f, 0.85);
    this.scene.add(hemiLight);

    this.keyLight = new THREE.DirectionalLight(0xeef2ff, 1.5);
    this.keyLight.position.set(5, 7, 6);
    this.scene.add(this.keyLight);

    this.indigoLight = new THREE.PointLight(0x6366f1, 2.8, 18, 1.8);
    this.indigoLight.position.set(0, 2.2, 2.8);
    this.scene.add(this.indigoLight);

    this.cyanLight = new THREE.PointLight(0x00f5d4, 2.6, 18, 1.8);
    this.cyanLight.position.set(4.5, -1.6, 2.4);
    this.scene.add(this.cyanLight);

    this.magentaLight = new THREE.PointLight(0xec4899, 2.2, 18, 1.8);
    this.magentaLight.position.set(-4.2, 2.4, -2.5);
    this.scene.add(this.magentaLight);

    // Multi-Part Composite 3D Kinetic Core
    this.coreGroup = new THREE.Group();
    const initialOffset =
      width >= 900 ? CHOREOGRAPHY.hero.coreDesktopOffset : CHOREOGRAPHY.hero.coreMobileOffset;
    this.coreGroup.position.copy(initialOffset);
    this.scene.add(this.coreGroup);

    // 1. Central Crystal Octahedron
    const crystalGeo = new THREE.OctahedronGeometry(0.76, 0);
    const crystalMat = new THREE.MeshPhysicalMaterial({
      color: 0x312e81,
      emissive: 0x4f46e5,
      emissiveIntensity: 0.45,
      metalness: 0.2,
      roughness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      transmission: this.isSoftwareGl ? 0 : 0.65,
      ior: 1.65,
      thickness: 1.1,
      attenuationColor: new THREE.Color(0x6366f1),
      transparent: this.isSoftwareGl,
      opacity: this.isSoftwareGl ? 0.82 : 1.0,
    });
    this.crystalCore = new THREE.Mesh(crystalGeo, crystalMat);
    this.coreGroup.add(this.crystalCore);
    this.disposables.push(crystalGeo, crystalMat);

    // 2. Inner Glowing Icosahedron Wireframe Core (#6366F1)
    const icoGeo = new THREE.IcosahedronGeometry(1.22, 1);
    const icoMat = new THREE.MeshStandardMaterial({
      color: 0x6366f1,
      emissive: 0x6366f1,
      emissiveIntensity: 1.15,
      wireframe: true,
      transparent: true,
      opacity: 0.72,
      roughness: 0.3,
      metalness: 0.6,
    });
    this.wireIcosahedron = new THREE.Mesh(icoGeo, icoMat);
    this.coreGroup.add(this.wireIcosahedron);
    this.disposables.push(icoGeo, icoMat);

    // Precision Axial Hubs & Gimbal Collar
    const hubGeo = new THREE.CylinderGeometry(0.14, 0.22, 0.24, 16);
    const hubMat = new THREE.MeshPhysicalMaterial({
      color: 0xd4d4d8,
      metalness: 0.94,
      roughness: 0.18,
      anisotropy: 0.8,
      clearcoat: 0.4,
    });
    const northHub = new THREE.Mesh(hubGeo, hubMat);
    northHub.position.set(0, 1.28, 0);
    const southHub = new THREE.Mesh(hubGeo, hubMat);
    southHub.rotation.z = Math.PI;
    southHub.position.set(0, -1.28, 0);
    this.coreGroup.add(northHub, southHub);
    this.disposables.push(hubGeo, hubMat);

    // 3. Three Counter-Rotating Orbital Torus Rings with Satellite Nodes
    this.ringCyan = this.createOrbitalRing(1.78, 0.026, 0x00f5d4, 0x00f5d4, 0.9, 2);
    this.ringCyan.rotation.set(Math.PI * 0.18, 0.2, 0);

    this.ringMagenta = this.createOrbitalRing(2.2, 0.022, 0xec4899, 0xec4899, 0.85, 2);
    this.ringMagenta.rotation.set(-Math.PI * 0.32, 0.45, Math.PI * 0.15);

    this.ringIndigo = this.createOrbitalRing(2.66, 0.018, 0xc7d2fe, 0x6366f1, 0.65, 3);
    this.ringIndigo.rotation.set(Math.PI * 0.44, -0.35, 0.1);

    this.coreGroup.add(this.ringCyan, this.ringMagenta, this.ringIndigo);

    // 4. Instanced 3D Particle Constellation Field (450 nodes)
    const particleGeo = new THREE.OctahedronGeometry(0.032, 0);
    const particleMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.25,
      metalness: 0.5,
      emissive: 0x312e81,
      emissiveIntensity: 0.55,
    });
    this.particles = new THREE.InstancedMesh(particleGeo, particleMat, PARTICLE_COUNT_HIGH);
    this.particles.frustumCulled = false;

    const palette = [_colorA, _colorB, _colorC, _colorD];
    for (let i = 0; i < PARTICLE_COUNT_HIGH; i++) {
      const seed: ParticleSeed = {
        radius: 3.1 + Math.random() * 5.8,
        theta: Math.random() * Math.PI * 2,
        phi: Math.acos(2 * Math.random() - 1),
        speed: (0.04 + Math.random() * 0.09) * (Math.random() > 0.5 ? 1 : -1),
        scale: 0.55 + Math.random() * 1.15,
        phase: Math.random() * Math.PI * 2,
      };
      this.particleSeeds.push(seed);
      const swatch = palette[i % palette.length];
      this.particles.setColorAt(i, swatch);
    }
    if (this.particles.instanceColor) {
      this.particles.instanceColor.needsUpdate = true;
    }
    this.updateParticleMatrices(0);
    this.particles.computeBoundingSphere();
    this.particles.count =
      this.qualityMode === 'eco' ? PARTICLE_COUNT_ECO : PARTICLE_COUNT_HIGH;
    this.scene.add(this.particles);
    this.disposables.push(particleGeo, particleMat);

    if (!this.isSoftwareGl) {
      this.renderer.compile(this.scene, this.camera);
    }

    // Bind events
    this.onPointerMoveBound = this.handlePointerMove.bind(this);
    this.onResizeBound = this.handleResize.bind(this);
    this.onVisibilityChangeBound = this.handleVisibilityChange.bind(this);
    this.onContextLostBound = (e: Event) => {
      e.preventDefault();
      this.contextLost = true;
      this.stopLoop();
    };
    this.onContextRestoredBound = () => {
      this.contextLost = false;
      this.startLoop();
    };

    window.addEventListener('pointermove', this.onPointerMoveBound, { passive: true });
    window.addEventListener('resize', this.onResizeBound);
    document.addEventListener('visibilitychange', this.onVisibilityChangeBound);
    this.renderer.domElement.addEventListener('webglcontextlost', this.onContextLostBound);
    this.renderer.domElement.addEventListener('webglcontextrestored', this.onContextRestoredBound);

    this.startLoop();
  }

  private static detectSoftwareWebGL(): boolean {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    } catch {
      return false;
    }
  }

  private createOrbitalRing(
    radius: number,
    tube: number,
    colorHex: number,
    emissiveHex: number,
    emissiveIntensity: number,
    beaconCount: number
  ): THREE.Group {
    const group = new THREE.Group();

    const torusGeo = new THREE.TorusGeometry(radius, tube, 18, 120);
    const torusMat = new THREE.MeshPhysicalMaterial({
      color: colorHex,
      emissive: emissiveHex,
      emissiveIntensity,
      metalness: 0.88,
      roughness: 0.16,
      clearcoat: 0.9,
      clearcoatRoughness: 0.1,
    });
    const ringMesh = new THREE.Mesh(torusGeo, torusMat);
    group.add(ringMesh);
    this.disposables.push(torusGeo, torusMat);

    const beaconGeo = new THREE.OctahedronGeometry(tube * 2.7, 0);
    const beaconMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: emissiveHex,
      emissiveIntensity: 1.8,
      metalness: 0.4,
      roughness: 0.15,
    });
    this.disposables.push(beaconGeo, beaconMat);

    for (let i = 0; i < beaconCount; i++) {
      const angle = (i / beaconCount) * Math.PI * 2;
      const beacon = new THREE.Mesh(beaconGeo, beaconMat);
      beacon.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, 0);
      group.add(beacon);
    }

    return group;
  }

  private applyPixelRatio(): void {
    if (this.isSoftwareGl) {
      this.renderer.setPixelRatio(1);
    } else if (this.qualityMode === 'eco') {
      this.renderer.setPixelRatio(1);
    } else {
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }
  }

  public setSection(section: SectionId): void {
    this.activeSection = section;
  }

  public setQualityMode(mode: QualityMode): void {
    this.qualityMode = mode;
    this.applyPixelRatio();
    this.particles.count = mode === 'eco' ? PARTICLE_COUNT_ECO : PARTICLE_COUNT_HIGH;
  }

  private handlePointerMove(e: PointerEvent): void {
    this.mouseNdcX = (e.clientX / window.innerWidth) * 2 - 1;
    this.mouseNdcY = -(e.clientY / window.innerHeight) * 2 + 1;
  }

  private handleResize(): void {
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
    this.applyPixelRatio();
  }

  private handleVisibilityChange(): void {
    this.isTabHidden = document.hidden;
    if (this.isTabHidden) {
      this.stopLoop();
    } else {
      this.clock.getDelta(); // Reset delta spike after sleep
      this.startLoop();
    }
  }

  private updateParticleMatrices(time: number): void {
    const activeCount =
      this.qualityMode === 'eco' ? PARTICLE_COUNT_ECO : PARTICLE_COUNT_HIGH;

    for (let i = 0; i < activeCount; i++) {
      const seed = this.particleSeeds[i];
      const angle = seed.theta + time * seed.speed;
      const sinPhi = Math.sin(seed.phi);

      const x = seed.radius * sinPhi * Math.cos(angle);
      const y = seed.radius * Math.cos(seed.phi) + Math.sin(time * 0.7 + seed.phase) * 0.14;
      const z = seed.radius * sinPhi * Math.sin(angle);

      _dummy.position.set(x, y, z);
      _dummy.rotation.set(time * 0.4 + seed.phase, angle, 0);
      _dummy.scale.setScalar(seed.scale);
      _dummy.updateMatrix();
      this.particles.setMatrixAt(i, _dummy.matrix);
    }
    this.particles.instanceMatrix.needsUpdate = true;
  }

  private afterDraw(cb: () => void): void {
    const gl = this.renderer.getContext() as WebGL2RenderingContext;
    if (typeof gl.fenceSync === 'function') {
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        if (this.isTabHidden || this.contextLost) return;
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          this.frameId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          this.frameId = window.setTimeout(cb, 80);
        }
      };
      this.frameId = window.setTimeout(poll, 5);
    } else {
      this.frameId = window.setTimeout(cb, 80);
    }
  }

  private tick = (): void => {
    if (this.isTabHidden || this.contextLost) return;

    const rawDelta = Math.min(this.clock.getDelta(), 0.05);
    const motionFactor = this.prefersReducedMotion ? 0.12 : 1.0;
    const preset = CHOREOGRAPHY[this.activeSection];

    this.currentSpin = THREE.MathUtils.damp(
      this.currentSpin,
      preset.spinMultiplier,
      3.5,
      rawDelta
    );
    this.elapsed += rawDelta * this.currentSpin * motionFactor;

    // 1. Core & Ring Counter-Rotation Kinematics
    this.wireIcosahedron.rotation.y = this.elapsed * 0.28;
    this.wireIcosahedron.rotation.x = Math.sin(this.elapsed * 0.2) * 0.25;

    this.crystalCore.rotation.y = -this.elapsed * 0.42;
    this.crystalCore.rotation.z = this.elapsed * 0.18;

    this.ringCyan.rotation.z = this.elapsed * 0.55;
    this.ringCyan.rotation.y = Math.sin(this.elapsed * 0.35) * 0.28;

    this.ringMagenta.rotation.z = -this.elapsed * 0.42;
    this.ringMagenta.rotation.x = -Math.PI * 0.32 + Math.cos(this.elapsed * 0.3) * 0.18;

    this.ringIndigo.rotation.z = this.elapsed * 0.25;
    this.ringIndigo.rotation.y = -0.35 + Math.sin(this.elapsed * 0.22) * 0.15;

    // 2. Responsive Core Positioning & Rim Light Choreography
    const isDesktop = (this.container.clientWidth || window.innerWidth) >= 900;
    const desiredOffset = isDesktop ? preset.coreDesktopOffset : preset.coreMobileOffset;
    _targetCore.copy(desiredOffset);
    _targetCore.y += Math.sin(this.elapsed * 1.1) * 0.08;

    this.coreGroup.position.x = THREE.MathUtils.damp(
      this.coreGroup.position.x,
      _targetCore.x,
      3.0,
      rawDelta
    );
    this.coreGroup.position.y = THREE.MathUtils.damp(
      this.coreGroup.position.y,
      _targetCore.y,
      3.0,
      rawDelta
    );
    this.coreGroup.position.z = THREE.MathUtils.damp(
      this.coreGroup.position.z,
      _targetCore.z,
      3.0,
      rawDelta
    );

    this.cyanLight.intensity = THREE.MathUtils.damp(
      this.cyanLight.intensity,
      preset.rimCyan,
      3.0,
      rawDelta
    );
    this.magentaLight.intensity = THREE.MathUtils.damp(
      this.magentaLight.intensity,
      preset.rimMagenta,
      3.0,
      rawDelta
    );
    this.indigoLight.intensity = THREE.MathUtils.damp(
      this.indigoLight.intensity,
      preset.rimIndigo,
      3.0,
      rawDelta
    );

    // 3. Camera Parallax + Section Drift (yields cleanly while user orbits manually)
    if (!this.userDragging) {
      const parallaxScale = this.prefersReducedMotion ? 0 : 0.36;
      _targetCam.set(
        preset.cameraPos.x + this.mouseNdcX * parallaxScale,
        preset.cameraPos.y + this.mouseNdcY * (parallaxScale * 0.7),
        preset.cameraPos.z
      );

      this.camera.position.x = THREE.MathUtils.damp(
        this.camera.position.x,
        _targetCam.x,
        2.5,
        rawDelta
      );
      this.camera.position.y = THREE.MathUtils.damp(
        this.camera.position.y,
        _targetCam.y,
        2.5,
        rawDelta
      );
      this.camera.position.z = THREE.MathUtils.damp(
        this.camera.position.z,
        _targetCam.z,
        2.5,
        rawDelta
      );
    }

    this.controls.target.x = THREE.MathUtils.damp(
      this.controls.target.x,
      this.coreGroup.position.x * 0.25,
      3.0,
      rawDelta
    );
    this.controls.update();

    // 4. Instanced Particle Field Update
    this.updateParticleMatrices(this.elapsed);

    this.renderer.render(this.scene, this.camera);

    if (this.isSoftwareGl) {
      this.afterDraw(this.tick);
    } else {
      this.frameId = requestAnimationFrame(this.tick);
    }
  };

  private startLoop(): void {
    if (this.frameId !== 0 || this.isTabHidden || this.contextLost) return;
    this.clock.getDelta();
    this.frameId = requestAnimationFrame(this.tick);
  }

  private stopLoop(): void {
    if (this.frameId !== 0) {
      cancelAnimationFrame(this.frameId);
      clearTimeout(this.frameId);
      this.frameId = 0;
    }
  }

  public dispose(): void {
    this.stopLoop();
    window.removeEventListener('pointermove', this.onPointerMoveBound);
    window.removeEventListener('resize', this.onResizeBound);
    document.removeEventListener('visibilitychange', this.onVisibilityChangeBound);
    this.renderer.domElement.removeEventListener('webglcontextlost', this.onContextLostBound);
    this.renderer.domElement.removeEventListener(
      'webglcontextrestored',
      this.onContextRestoredBound
    );

    this.controls.dispose();
    for (const item of this.disposables) {
      item.dispose();
    }
    this.renderer.dispose();
    if (this.renderer.domElement.parentNode === this.container) {
      this.container.removeChild(this.renderer.domElement);
    }
  }
}
