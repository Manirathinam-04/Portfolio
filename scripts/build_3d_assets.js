/**
 * 3D Asset Generator for Spider-Man Hand & Realistic Spider
 * Exports production-ready binary GLB models to public/models/
 */
import fs from 'fs';
import path from 'path';

class FileReader {
  readAsArrayBuffer(blob) {
    blob.arrayBuffer().then((buf) => {
      this.result = buf;
      if (this.onloadend) this.onloadend();
    });
  }
}
global.FileReader = FileReader;

async function generateAssets() {
  const THREE = await import('three');
  const { GLTFExporter } = await import('three/examples/jsm/exporters/GLTFExporter.js');

  const modelsDir = path.resolve('public/models');
  if (!fs.existsSync(modelsDir)) {
    fs.mkdirSync(modelsDir, { recursive: true });
  }

  // =========================================================================
  // 1. BUILD SPIDER-MAN HAND & MECHANICAL WEB-SHOOTER MODEL
  // =========================================================================
  console.log('Building 3D Spider-Man Hand with Mechanical Web-Shooter...');

  const handScene = new THREE.Scene();
  handScene.name = 'spiderman_hand_scene';

  // --- Materials ---
  const redSuitMat = new THREE.MeshStandardMaterial({
    color: 0xc51624,
    roughness: 0.55,
    metalness: 0.15,
    name: 'SpiderMan_Red_Fabric'
  });

  const blueSuitMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    roughness: 0.65,
    metalness: 0.2,
    name: 'SpiderMan_Navy_Fabric'
  });

  const blackWebMat = new THREE.MeshStandardMaterial({
    color: 0x111111,
    roughness: 0.4,
    metalness: 0.3,
    name: 'SpiderMan_Web_Piping'
  });

  const metalHousingMat = new THREE.MeshStandardMaterial({
    color: 0x334155,
    metalness: 0.88,
    roughness: 0.28,
    name: 'WebShooter_Titanium_Housing'
  });

  const chromeTrimMat = new THREE.MeshStandardMaterial({
    color: 0xe2e8f0,
    metalness: 0.95,
    roughness: 0.15,
    name: 'WebShooter_Chrome_Trim'
  });

  const cyanEmitterMat = new THREE.MeshStandardMaterial({
    color: 0x00f0ff,
    emissive: 0x00f0ff,
    emissiveIntensity: 2.8,
    roughness: 0.2,
    name: 'WebShooter_Plasma_Core'
  });

  // --- Forearm ---
  const armGroup = new THREE.Group();
  armGroup.name = 'spiderman_arm';

  // Upper/mid forearm cylinder
  const forearmGeo = new THREE.CylinderGeometry(0.72, 0.95, 3.8, 24);
  forearmGeo.rotateZ(Math.PI / 2);
  const forearmMesh = new THREE.Mesh(forearmGeo, redSuitMat);
  forearmMesh.position.set(-2.0, 0, 0);
  armGroup.add(forearmMesh);

  // Underside navy blue panel
  const bluePanelGeo = new THREE.CylinderGeometry(0.70, 0.93, 3.6, 24, 1, false, Math.PI * 0.7, Math.PI * 0.6);
  bluePanelGeo.rotateZ(Math.PI / 2);
  const bluePanelMesh = new THREE.Mesh(bluePanelGeo, blueSuitMat);
  bluePanelMesh.position.set(-2.0, 0, 0);
  armGroup.add(bluePanelMesh);

  // Black web pattern rings on forearm
  for (let i = 0; i < 4; i++) {
    const ringGeo = new THREE.TorusGeometry(0.74 + i * 0.05, 0.025, 8, 32);
    ringGeo.rotateY(Math.PI / 2);
    const ringMesh = new THREE.Mesh(ringGeo, blackWebMat);
    ringMesh.position.set(-3.2 + i * 0.8, 0, 0);
    armGroup.add(ringMesh);
  }

  // --- Wrist Cuff ---
  const wristCuffGeo = new THREE.CylinderGeometry(0.68, 0.72, 0.5, 24);
  wristCuffGeo.rotateZ(Math.PI / 2);
  const wristCuffMesh = new THREE.Mesh(wristCuffGeo, metalHousingMat);
  wristCuffMesh.position.set(0.1, 0, 0);
  armGroup.add(wristCuffMesh);

  // --- Mechanical Web-Shooter on Wrist ---
  const shooterGroup = new THREE.Group();
  shooterGroup.name = 'web_shooter_housing';
  shooterGroup.position.set(0.15, 0.58, 0);

  // Main metallic housing
  const housingGeo = new THREE.BoxGeometry(0.95, 0.35, 0.75);
  const housingMesh = new THREE.Mesh(housingGeo, metalHousingMat);
  shooterGroup.add(housingMesh);

  // Top beveled cover
  const topCoverGeo = new THREE.BoxGeometry(0.75, 0.12, 0.6);
  topCoverGeo.translate(0, 0.22, 0);
  const topCoverMesh = new THREE.Mesh(topCoverGeo, chromeTrimMat);
  shooterGroup.add(topCoverMesh);

  // Side trigger conduit tubes
  const tube1Geo = new THREE.CylinderGeometry(0.045, 0.045, 0.85, 12);
  tube1Geo.rotateZ(Math.PI / 2);
  const tube1 = new THREE.Mesh(tube1Geo, chromeTrimMat);
  tube1.position.set(0, 0.12, 0.38);
  shooterGroup.add(tube1);

  const tube2 = new THREE.Mesh(tube1Geo, chromeTrimMat);
  tube2.position.set(0, 0.12, -0.38);
  shooterGroup.add(tube2);

  // Status LED
  const ledGeo = new THREE.SphereGeometry(0.055, 12, 12);
  const ledMesh = new THREE.Mesh(ledGeo, cyanEmitterMat);
  ledMesh.position.set(-0.25, 0.25, 0.2);
  shooterGroup.add(ledMesh);

  // --- THE FIRING NOZZLE (CRITICAL ASSET NODE) ---
  const nozzleGroup = new THREE.Group();
  nozzleGroup.name = 'web_nozzle';
  // Positioned at the front face of the shooter, aimed forward-right (+X)
  nozzleGroup.position.set(0.55, 0.05, 0);

  // Machined titanium nozzle cylinder
  const nozzleRimGeo = new THREE.CylinderGeometry(0.14, 0.17, 0.35, 16);
  nozzleRimGeo.rotateZ(Math.PI / 2);
  const nozzleRimMesh = new THREE.Mesh(nozzleRimGeo, chromeTrimMat);
  nozzleGroup.add(nozzleRimMesh);

  // Inner plasma firing aperture
  const nozzleCoreGeo = new THREE.CylinderGeometry(0.09, 0.09, 0.2, 16);
  nozzleCoreGeo.rotateZ(Math.PI / 2);
  const nozzleCoreMesh = new THREE.Mesh(nozzleCoreGeo, cyanEmitterMat);
  nozzleCoreMesh.position.set(0.05, 0, 0);
  nozzleGroup.add(nozzleCoreMesh);

  shooterGroup.add(nozzleGroup);
  armGroup.add(shooterGroup);

  // --- Hand Palm & Fingers (Iconic Web-Shooting Pose: 🤟) ---
  const gloveGroup = new THREE.Group();
  gloveGroup.name = 'spiderman_glove';
  gloveGroup.position.set(0.4, 0, 0);

  // Palm base
  const palmGeo = new THREE.BoxGeometry(1.2, 0.55, 1.1);
  palmGeo.translate(0.6, -0.05, 0);
  const palmMesh = new THREE.Mesh(palmGeo, redSuitMat);
  gloveGroup.add(palmMesh);

  // Palm web webbing decal
  const palmRingGeo = new THREE.TorusGeometry(0.45, 0.02, 8, 24);
  const palmRing = new THREE.Mesh(palmRingGeo, blackWebMat);
  palmRing.position.set(0.6, -0.05, 0.56);
  gloveGroup.add(palmRing);

  // Helper to create finger segment
  const createPhalanx = (len, radius1, radius2) => {
    const geo = new THREE.CylinderGeometry(radius2, radius1, len, 12);
    geo.translate(0, len / 2, 0);
    geo.rotateZ(-Math.PI / 2);
    return new THREE.Mesh(geo, redSuitMat);
  };

  // 1. INDEX FINGER (Extended Pointing Forward)
  const indexGroup = new THREE.Group();
  indexGroup.name = 'finger_index';
  indexGroup.position.set(1.2, 0.05, 0.42);
  const indexP1 = createPhalanx(0.75, 0.13, 0.12);
  indexP1.rotation.z = 0.08;
  const indexP2 = createPhalanx(0.6, 0.12, 0.10);
  indexP2.position.set(0.72, 0.05, 0);
  indexP2.rotation.z = -0.05;
  const indexP3 = createPhalanx(0.45, 0.10, 0.08);
  indexP3.position.set(1.3, 0.02, 0);
  indexGroup.add(indexP1, indexP2, indexP3);
  gloveGroup.add(indexGroup);

  // 2. LITTLE FINGER / PINKY (Extended Pointing Forward)
  const pinkyGroup = new THREE.Group();
  pinkyGroup.name = 'finger_pinky';
  pinkyGroup.position.set(1.2, 0.05, -0.42);
  const pinkyP1 = createPhalanx(0.65, 0.11, 0.10);
  pinkyP1.rotation.z = -0.06;
  const pinkyP2 = createPhalanx(0.5, 0.10, 0.09);
  pinkyP2.position.set(0.62, -0.04, 0);
  pinkyP2.rotation.z = 0.04;
  const pinkyP3 = createPhalanx(0.4, 0.09, 0.07);
  pinkyP3.position.set(1.1, -0.02, 0);
  pinkyGroup.add(pinkyP1, pinkyP2, pinkyP3);
  gloveGroup.add(pinkyGroup);

  // 3. MIDDLE FINGER (Curled tightly inward to palm trigger)
  const middleGroup = new THREE.Group();
  middleGroup.name = 'finger_middle';
  middleGroup.position.set(1.15, -0.1, 0.15);
  // Knuckle curls 85 degrees downward
  middleGroup.rotation.y = 0.1;
  middleGroup.rotation.z = -1.45;
  const middleP1 = createPhalanx(0.7, 0.14, 0.13);
  const middleP2 = createPhalanx(0.6, 0.13, 0.11);
  middleP2.position.set(0.65, 0, 0);
  middleP2.rotation.z = -1.35; // Curls back to touch palm
  middleGroup.add(middleP1, middleP2);
  gloveGroup.add(middleGroup);

  // 4. RING FINGER (Curled tightly inward to palm trigger)
  const ringGroup = new THREE.Group();
  ringGroup.name = 'finger_ring';
  ringGroup.position.set(1.15, -0.1, -0.15);
  ringGroup.rotation.y = -0.1;
  ringGroup.rotation.z = -1.45;
  const ringP1 = createPhalanx(0.68, 0.13, 0.12);
  const ringP2 = createPhalanx(0.58, 0.12, 0.10);
  ringP2.position.set(0.63, 0, 0);
  ringP2.rotation.z = -1.35;
  ringGroup.add(ringP1, ringP2);
  gloveGroup.add(ringGroup);

  // 5. THUMB (Extended Outward in Anatomical Rest)
  const thumbGroup = new THREE.Group();
  thumbGroup.name = 'finger_thumb';
  thumbGroup.position.set(0.5, -0.25, 0.55);
  thumbGroup.rotation.y = 0.85;
  thumbGroup.rotation.z = -0.3;
  const thumbP1 = createPhalanx(0.65, 0.15, 0.13);
  const thumbP2 = createPhalanx(0.5, 0.13, 0.10);
  thumbP2.position.set(0.62, 0, 0);
  thumbP2.rotation.z = 0.35;
  thumbGroup.add(thumbP1, thumbP2);
  gloveGroup.add(thumbGroup);

  armGroup.add(gloveGroup);
  handScene.add(armGroup);

  // Export spiderman-hand.glb
  const exporter = new GLTFExporter();
  await new Promise((resolve, reject) => {
    exporter.parse(
      handScene,
      (glbBuffer) => {
        const destPath = path.join(modelsDir, 'spiderman-hand.glb');
        fs.writeFileSync(destPath, Buffer.from(glbBuffer));
        console.log(`Saved ${destPath} (${glbBuffer.byteLength} bytes)`);
        resolve();
      },
      (err) => reject(err),
      { binary: true }
    );
  });

  // =========================================================================
  // 2. BUILD REALISTIC 3D CRAWLING SPIDER MODEL
  // =========================================================================
  console.log('Building 3D Realistic Spider Model...');

  const spiderScene = new THREE.Scene();
  spiderScene.name = 'spider_scene';

  const blackChitinMat = new THREE.MeshStandardMaterial({
    color: 0x0c1015,
    roughness: 0.22,
    metalness: 0.45,
    name: 'Spider_Black_Chitin'
  });

  const redHourglassMat = new THREE.MeshStandardMaterial({
    color: 0xff1744,
    emissive: 0xff1744,
    emissiveIntensity: 1.5,
    roughness: 0.3,
    name: 'Spider_Red_Hourglass'
  });

  const fangMat = new THREE.MeshStandardMaterial({
    color: 0xf1f5f9,
    roughness: 0.1,
    metalness: 0.2,
    name: 'Spider_Fangs'
  });

  const spiderRoot = new THREE.Group();
  spiderRoot.name = 'spider_root';

  // --- Cephalothorax (Head & Thorax) ---
  const cephalothoraxGeo = new THREE.SphereGeometry(0.35, 16, 14);
  cephalothoraxGeo.scale(1.0, 0.65, 1.25);
  const cephalothoraxMesh = new THREE.Mesh(cephalothoraxGeo, blackChitinMat);
  cephalothoraxMesh.position.set(0, 0.2, -0.2);
  spiderRoot.add(cephalothoraxMesh);

  // Eyes (8 tiny clustered beads)
  for (let i = 0; i < 4; i++) {
    const eyeGeo = new THREE.SphereGeometry(0.028, 8, 8);
    const eyeL = new THREE.Mesh(eyeGeo, blackChitinMat);
    eyeL.position.set(-0.08 - i * 0.04, 0.26, -0.58 + (i % 2) * 0.05);
    const eyeR = new THREE.Mesh(eyeGeo, blackChitinMat);
    eyeR.position.set(0.08 + i * 0.04, 0.26, -0.58 + (i % 2) * 0.05);
    spiderRoot.add(eyeL, eyeR);
  }

  // Chelicerae & Fangs
  const fangLGeo = new THREE.ConeGeometry(0.04, 0.18, 8);
  fangLGeo.rotateX(Math.PI * 0.65);
  const fangL = new THREE.Mesh(fangLGeo, fangMat);
  fangL.position.set(-0.09, 0.12, -0.65);
  const fangR = new THREE.Mesh(fangLGeo, fangMat);
  fangR.position.set(0.09, 0.12, -0.65);
  spiderRoot.add(fangL, fangR);

  // --- Abdomen (Opisthosoma) ---
  const abdomenGeo = new THREE.SphereGeometry(0.55, 18, 16);
  abdomenGeo.scale(1.05, 0.85, 1.45);
  const abdomenMesh = new THREE.Mesh(abdomenGeo, blackChitinMat);
  abdomenMesh.position.set(0, 0.32, 0.65);
  spiderRoot.add(abdomenMesh);

  // Hourglass Mark on Abdomen
  const hourglassGeo = new THREE.BoxGeometry(0.18, 0.02, 0.25);
  const hourglassMesh = new THREE.Mesh(hourglassGeo, redHourglassMat);
  hourglassMesh.position.set(0, 0.58, 0.65);
  spiderRoot.add(hourglassMesh);

  // --- 8 Articulated Curved Legs ---
  // Leg pairs spread naturally around the cephalothorax
  const legAngles = [
    { angle: -0.85, len: 1.1, name: 'L1', side: -1 }, // Front-left
    { angle: -0.35, len: 1.25, name: 'L2', side: -1 },
    { angle: 0.25, len: 1.15, name: 'L3', side: -1 },
    { angle: 0.75, len: 1.35, name: 'L4', side: -1 }, // Rear-left
    { angle: -0.85, len: 1.1, name: 'R1', side: 1 },  // Front-right
    { angle: -0.35, len: 1.25, name: 'R2', side: 1 },
    { angle: 0.25, len: 1.15, name: 'R3', side: 1 },
    { angle: 0.75, len: 1.35, name: 'R4', side: 1 },  // Rear-right
  ];

  legAngles.forEach((cfg) => {
    const legGroup = new THREE.Group();
    legGroup.name = `leg_${cfg.name}`;
    legGroup.position.set(cfg.side * 0.25, 0.2, -0.15 + cfg.angle * 0.45);

    // Femur segment (rises upward)
    const femurGeo = new THREE.CylinderGeometry(0.035, 0.05, cfg.len * 0.55, 8);
    femurGeo.translate(0, cfg.len * 0.27, 0);
    const femur = new THREE.Mesh(femurGeo, blackChitinMat);
    femur.rotation.z = -cfg.side * 0.75;
    femur.rotation.y = cfg.angle * 0.4;
    legGroup.add(femur);

    // Tibia/Tarsus segment (slopes downward to contact surface)
    const tibiaGeo = new THREE.CylinderGeometry(0.02, 0.035, cfg.len * 0.65, 8);
    tibiaGeo.translate(0, -cfg.len * 0.32, 0);
    const tibia = new THREE.Mesh(tibiaGeo, blackChitinMat);
    tibia.position.set(cfg.side * Math.sin(0.75) * cfg.len * 0.55, Math.cos(0.75) * cfg.len * 0.55, 0);
    tibia.rotation.z = -cfg.side * 1.35;
    legGroup.add(tibia);

    spiderRoot.add(legGroup);
  });

  spiderScene.add(spiderRoot);

  // Export spider.glb
  await new Promise((resolve, reject) => {
    exporter.parse(
      spiderScene,
      (glbBuffer) => {
        const destPath = path.join(modelsDir, 'spider.glb');
        fs.writeFileSync(destPath, Buffer.from(glbBuffer));
        console.log(`Saved ${destPath} (${glbBuffer.byteLength} bytes)`);
        resolve();
      },
      (err) => reject(err),
      { binary: true }
    );
  });

  console.log('All 3D assets generated successfully!');
}

generateAssets().catch(console.error);
