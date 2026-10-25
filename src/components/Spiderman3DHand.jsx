import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import './SpidermanHeroWebScene.css';

/**
 * Spiderman3DHand Component
 * Dual-pipeline Spider-Man arm renderer:
 * 1. 'photoreal': Cinematic live-action VFX Spider-Man arm with hyper-detailed suit fabric,
 *    carbon-fiber gauntlet, and pulsing cyan plasma web-shooter.
 * 2. '3d-mesh': Real-time Three.js WebGL scene loading /models/spiderman-hand.glb
 *    with PBR materials and dynamic nozzle world-to-screen tracking.
 */
export default function Spiderman3DHand({
  onNozzleUpdate,
  isShooting = false,
  handMode = 'photoreal' // 'photoreal' | '3d-mesh'
}) {
  const containerRef = useRef(null);
  const threeCanvasContainerRef = useRef(null);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [webGLFailed, setWebGLFailed] = useState(false);

  // Fallback/Photoreal Nozzle Coordinate Dispatcher
  useEffect(() => {
    const updateNozzle = () => {
      const container = containerRef.current;
      if (!container || !onNozzleUpdate) return;
      const cRect = container.getBoundingClientRect();

      // Nozzle emitter coordinate (at 45.8% horizontal, 45.2% vertical of arm container)
      const screenX = cRect.left + cRect.width * 0.458;
      const screenY = cRect.top + cRect.height * 0.452;

      onNozzleUpdate({ x: screenX, y: screenY });
    };

    updateNozzle();
    window.addEventListener('resize', updateNozzle);
    const interval = setInterval(updateNozzle, 120);

    return () => {
      window.removeEventListener('resize', updateNozzle);
      clearInterval(interval);
    };
  }, [onNozzleUpdate, handMode]);

  // Three.js WebGL Pipeline for 3D Mesh Mode
  useEffect(() => {
    if (handMode !== '3d-mesh') return;
    const container = threeCanvasContainerRef.current;
    if (!container) return;

    let renderer, scene, camera, animationFrameId, nozzleMesh;

    try {
      const width = container.clientWidth || 380;
      const height = container.clientHeight || 300;

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
      camera.position.set(0.3, 0.2, 5.2);
      camera.lookAt(0.1, 0.1, 0);

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.3;
      container.appendChild(renderer.domElement);

      // Cinematic 3D Lighting
      const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
      keyLight.position.set(2, 4, 3);
      scene.add(keyLight);

      const ambientLight = new THREE.AmbientLight(0x1e293b, 1.0);
      scene.add(ambientLight);

      const cyanRim = new THREE.PointLight(0x00f0ff, 4.0, 6);
      cyanRim.position.set(1.2, 0.8, 1);
      scene.add(cyanRim);

      const redRim = new THREE.DirectionalLight(0xe11d48, 2.5);
      redRim.position.set(-3, 1, -2);
      scene.add(redRim);

      // Load /models/spiderman-hand.glb
      const loader = new GLTFLoader();
      loader.load(
        '/models/spiderman-hand.glb',
        (gltf) => {
          const model = gltf.scene;
          model.position.set(-0.15, -0.2, 0);
          model.rotation.set(0.06, -0.12, -0.04);
          model.scale.set(1.1, 1.1, 1.1);
          nozzleMesh = model.getObjectByName('web_nozzle');
          scene.add(model);
          setModelLoaded(true);
        },
        undefined,
        (err) => {
          console.warn('WebGL GLB load fallback:', err);
          setWebGLFailed(true);
        }
      );

      let clock = new THREE.Clock();

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        if (scene.children.length > 4) {
          const handModel = scene.children[4];
          handModel.position.y = -0.2 + Math.sin(elapsedTime * 1.5) * 0.02;
          handModel.rotation.z = -0.04 + Math.cos(elapsedTime * 1.2) * 0.015;
        }

        if (nozzleMesh && onNozzleUpdate && container) {
          const worldPos = new THREE.Vector3();
          nozzleMesh.getWorldPosition(worldPos);
          const projected = worldPos.clone().project(camera);
          const cRect = container.getBoundingClientRect();
          const screenX = cRect.left + (projected.x * 0.5 + 0.5) * cRect.width;
          const screenY = cRect.top + (-(projected.y * 0.5) + 0.5) * cRect.height;
          onNozzleUpdate({ x: screenX, y: screenY });
        }

        renderer.render(scene, camera);
      };

      animate();

      const handleResize = () => {
        if (!container || !renderer || !camera) return;
        const newW = container.clientWidth || 380;
        const newH = container.clientHeight || 300;
        camera.aspect = newW / newH;
        camera.updateProjectionMatrix();
        renderer.setSize(newW, newH);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationFrameId);
        if (renderer && renderer.domElement) {
          container.removeChild(renderer.domElement);
          renderer.dispose();
        }
      };
    } catch (e) {
      console.warn('WebGL initialization error:', e);
      setTimeout(() => setWebGLFailed(true), 0);
    }
  }, [handMode, onNozzleUpdate]);

  return (
    <div className="spiderman-3d-hand-stage" ref={containerRef}>
      {/* 1. Photorealistic Live-Action VFX Arm (Movie Quality) */}
      {handMode === 'photoreal' && (
        <div className="spiderman-photoreal-overlay">
          <img
            src="/spidey-arm-real.jpg"
            alt="Spider-Man Arm & Web-Shooter"
            className="spiderman-real-arm-img"
          />
          {/* High-Tech Glowing Web-Shooter Nozzle */}
          <div className={`spiderman-fallback-nozzle ${isShooting ? 'firing' : ''}`}>
            <div className="nozzle-core-spark"></div>
            <div className="nozzle-pulse-halo"></div>
          </div>
        </div>
      )}

      {/* 2. Real-Time 3D WebGL GLTF Scene */}
      {handMode === '3d-mesh' && (
        <div className="spiderman-threejs-canvas-wrapper" ref={threeCanvasContainerRef}>
          {(!modelLoaded || webGLFailed) && (
            <div className="model-loading-placeholder">
              <span className="loading-dot"></span>
              <span>Loading 3D Hand Model...</span>
            </div>
          )}
        </div>
      )}

      {/* Comic / Live-Action THWIP! sound effect badge */}
      {isShooting && (
        <div className="hero-thwip-badge">
          <span className="thwip-title">THWIP!</span>
          <span className="thwip-desc">WEB LINE ACTIVE</span>
        </div>
      )}
    </div>
  );
}
