/**
 * app.js - Tata Surya Interaktif Space VR menggunakan Three.js & WebXR
 */

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { VRButton } from 'three/addons/webxr/VRButton.js';

// --- DATA PLANET (BAHASA INDONESIA) ---
const planetInfo = {
  sun: {
    name: 'Matahari',
    emoji: '☀️',
    type: 'Bintang Deret Utama',
    diameter: '1.392.700 km',
    temp: '5.500 °C',
    orbit: 'Pusat Tata Surya',
    moons: '8 Planet',
    description: 'Matahari adalah bintang raksasa di pusat Tata Surya yang memancarkan energi cahaya dan panas. Energi ini sangat penting untuk kelangsungan hidup semua makhluk hidup di Bumi.',
    facts: [
      'Matahari mencakup sekitar 99,86% dari seluruh massa Tata Surya.',
      'Energi matahari dihasilkan dari fusi nuklir hidrogen menjadi helium.'
    ]
  },
  mercury: {
    name: 'Merkurius',
    emoji: '☄️',
    type: 'Planet Terestrial',
    diameter: '4.879 km',
    temp: '-173°C s/d 427°C',
    orbit: '88 Hari',
    moons: '0 Satelit',
    description: 'Merkurius adalah planet terdekat dari Matahari sekaligus planet terkecil di Tata Surya. Planet ini tidak memiliki atmosfer tebal, sehingga suhunya berfluktuasi sangat ekstrem antara siang dan malam.',
    facts: [
      'Satu tahun di Merkurius (waktu revolusi) hanya berlangsung selama 88 hari Bumi.',
      'Meskipun terdekat dari matahari, Merkurius bukanlah planet terpanas.'
    ]
  },
  venus: {
    name: 'Venus',
    emoji: '🟡',
    type: 'Planet Terestrial',
    diameter: '12.104 km',
    temp: '462 °C',
    orbit: '225 Hari',
    moons: '0 Satelit',
    description: 'Venus adalah planet kedua dari Matahari. Venus adalah planet terpanas di Tata Surya karena atmosfernya yang super tebal memerangkap panas dalam efek rumah kaca yang tidak terkendali.',
    facts: [
      'Venus berputar berlawanan arah jarum jam (retrograde) dibanding planet lain.',
      'Venus sering terlihat sangat terang di langit subuh atau senja dan dijuluki Bintang Fajar.'
    ]
  },
  earth: {
    name: 'Bumi',
    emoji: '🌍',
    type: 'Planet Terestrial',
    diameter: '12.742 km',
    temp: '15 °C',
    orbit: '365 Hari',
    moons: '1 Satelit',
    description: 'Bumi adalah planet ketiga dari Matahari dan satu-satunya tempat di alam semesta yang sejauh ini diketahui memiliki kehidupan. Bumi kaya akan air cair dan diselimuti atmosfer pelindung.',
    facts: [
      'Sekitar 71% permukaan Bumi ditutupi oleh air laut.',
      'Atmosfer Bumi kaya akan oksigen dan nitrogen yang mendukung kehidupan.'
    ]
  },
  moon: {
    name: 'Bulan',
    emoji: '🌑',
    type: 'Satelit Alami',
    diameter: '3.474 km',
    temp: '-130°C s/d 120°C',
    orbit: '27 Hari',
    moons: 'Bumi',
    description: 'Bulan adalah satu-satunya satelit alami Bumi. Keberadaan Bulan membantu menstabilkan kemiringan sumbu Bumi dan menciptakan pasang surut air laut yang memengaruhi ekosistem pesisir.',
    facts: [
      'Bulan selalu menunjukkan wajah yang sama ke Bumi karena mengalami rotasi sinkron.',
      'Bulan adalah satu-satunya benda langit selain Bumi yang pernah dikunjungi manusia.'
    ]
  },
  mars: {
    name: 'Mars',
    emoji: '🔴',
    type: 'Planet Terestrial',
    diameter: '6.779 km',
    temp: '-63 °C',
    orbit: '687 Hari',
    moons: '2 Satelit',
    description: 'Mars adalah planet keempat dari Matahari, sering dijuluki Planet Merah karena kandungan besi oksida (karat) di permukaannya. Mars memiliki atmosfer yang sangat tipis dan dingin.',
    facts: [
      'Mars memiliki Gunung Olympus, gunung berapi tertinggi di Tata Surya (tingginya 3x Everest).',
      'Ilmuwan menemukan bukti adanya air mengalir dalam bentuk es di bawah permukaannya.'
    ]
  },
  jupiter: {
    name: 'Jupiter',
    emoji: '🟠',
    type: 'Raksasa Gas',
    diameter: '139.820 km',
    temp: '-108 °C',
    orbit: '12 Tahun',
    moons: '95 Satelit',
    description: 'Jupiter adalah planet kelima dan merupakan planet terbesar di Tata Surya. Sebagai raksasa gas, Jupiter tidak memiliki permukaan padat dan terkenal dengan badai abadi raksasa bernama Bintik Merah Besar.',
    facts: [
      'Bintik Merah Besar adalah badai raksasa berputar yang ukurannya lebih lebar dari Bumi.',
      'Jupiter memiliki gravitasi super kuat yang bertindak sebagai pelindung kosmik bagi planet dalam.'
    ]
  },
  saturn: {
    name: 'Saturnus',
    emoji: '🪐',
    type: 'Raksasa Gas',
    diameter: '116.460 km',
    temp: '-139 °C',
    orbit: '29 Tahun',
    moons: '146 Satelit',
    description: 'Saturnus adalah planet keenam dari Matahari, terkenal sebagai planet terindah berkat sistem cincin es dan debu kosmiknya yang sangat megah dan bercahaya.',
    facts: [
      'Meskipun cincinnya membentang ribuan kilometer, ketebalan rata-ratanya hanya sekitar 10 meter.',
      'Kerapatan planet Saturnus sangat rendah; jika ada wadah air raksasa, ia akan mengapung!'
    ]
  },
  uranus: {
    name: 'Uranus',
    emoji: '🔵',
    type: 'Raksasa Es',
    diameter: '50.724 km',
    temp: '-197 °C',
    orbit: '84 Tahun',
    moons: '28 Satelit',
    description: 'Uranus adalah planet ketujuh dari Matahari, berupa raksasa es dingin berwarna biru-hijau karena kandungan gas metana. Sumbu rotasi Uranus miring ekstrem hingga berputar menyamping.',
    facts: [
      'Sumbu rotasi Uranus miring 98 derajat, membuatnya tampak menggelinding saat mengorbit.',
      'Uranus adalah planet pertama yang ditemukan menggunakan teleskop modern.'
    ]
  },
  neptune: {
    name: 'Neptunus',
    emoji: '🌀',
    type: 'Raksasa Es',
    diameter: '49.244 km',
    temp: '-201 °C',
    orbit: '165 Tahun',
    moons: '16 Satelit',
    description: 'Neptunus adalah planet terjauh dari Matahari. Berwarna biru tua pekat, Neptunus adalah tempat paling berangin di Tata Surya dengan kecepatan badai melebihi kecepatan suara.',
    facts: [
      'Satu tahun di Neptunus setara dengan 165 tahun di Bumi.',
      'Neptunus ditemukan melalui prediksi matematika terlebih dahulu sebelum terlihat lewat teleskop.'
    ]
  },
  pluto: {
    name: 'Pluto',
    emoji: '🌑',
    type: 'Planet Kerdil',
    diameter: '2.376 km',
    temp: '-229 °C',
    orbit: '248 Tahun',
    moons: '5 Satelit',
    description: 'Pluto terletak di Sabuk Kuiper luar. Sebelumnya dianggap sebagai planet kesembilan, pada tahun 2006 Persatuan Astronomi Internasional mengklasifikasikannya sebagai planet kerdil.',
    facts: [
      'Pluto memiliki dataran es besar berbentuk hati yang dinamai Tombaugh Regio.',
      'Ukurannya sangat kecil, bahkan lebih kecil jika dibandingkan dengan Bulan Bumi.'
    ]
  }
};

const planetOrder = ['sun', 'mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto'];

// --- VARIABEL UTAMA ---
let scene, camera, renderer, clock;
let controls, mixer;
let isVR = false;

// Objek 3D referensi
const planets = {};            // Menyimpan objek/grup tiap planet
const clickableObjects = [];   // List mesh planet untuk dideteksi raycaster
const orbitLines = [];         // List mesh garis orbit untuk disembunyikan/ditampilkan
let selectionRing;             // Ring neon penanda planet aktif

// Status UI / Simulasi
let selectedPlanetId = null;
let isAnimating = true;
let animationSpeed = 1.0;
let showOrbits = true;
let autoRotateCamera = true;
let targetCameraPosition = null;

// VR Spesifik
let dolly;                     // Grup untuk menampung kamera dan controller VR
let activeControllers = [];    // List controller VR
let gazeTarget = null;         // Planet yang sedang diincar pandangan VR Gaze
let gazeTime = 0;              // Waktu mulai menatap planet
let reticle;                   // Ring bidik VR Gaze (untuk mobile Cardboard)
let vrPanelMesh;               // Mesh UI 3D melayang di VR
let vrPanelCanvas;             // Canvas HTML5 untuk menggambar UI VR
let vrPanelTexture;            // Texture canvas UI VR

// Raycaster & Mouse
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let pointerDownX = 0;
let pointerDownY = 0;

// --- INISIALISASI ---
init();

function init() {
  // 1. Setup Scene, Camera, & Clock
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x020104);
  clock = new THREE.Clock();

  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 15, 30);
  scene.add(camera);

  // 2. Setup Renderer dengan WebXR diaktifkan
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.xr.enabled = true;
  document.getElementById('canvas-container').appendChild(renderer.domElement);

  // 3. Setup OrbitControls (Untuk desktop & mobile layar sentuh)
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.maxDistance = 150;
  controls.minDistance = 2;
  controls.autoRotate = autoRotateCamera;
  controls.autoRotateSpeed = 0.4;

  // 4. Setup Lighting
  // PointLight diletakkan tepat di tengah (Matahari) menyinari keluar
  const pointLight = new THREE.PointLight(0xffffff, 2.5, 100, 0.5);
  pointLight.position.set(0, 0, 0);
  scene.add(pointLight);

  // AmbientLight biru tua lembut untuk mengisi area bayangan luar angkasa
  const ambientLight = new THREE.AmbientLight(0x0e111a, 0.4);
  scene.add(ambientLight);

  // DirectionalLight tambahan dari atas agar detail permukaan planet lebih merata
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.3);
  dirLight.position.set(0, 20, 10);
  scene.add(dirLight);

  // 5. Efek Bintang Partikel (Space Background)
  createStarfield();

  // 6. Setup Dolly untuk WebXR (Kamera + Controller)
  dolly = new THREE.Group();
  dolly.add(camera);
  scene.add(dolly);

  // 7. Setup VR Controller & VR Gaze Reticle
  setupVRControllers();
  setupVRGazeReticle();
  setupVR3DPanel();

  // 8. Buat Selection Ring (Neon Pink)
  const selectionRingGeom = new THREE.RingGeometry(0.8, 0.85, 32);
  const selectionRingMat = new THREE.MeshBasicMaterial({
    color: 0xff007f,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.8
  });
  selectionRing = new THREE.Mesh(selectionRingGeom, selectionRingMat);
  selectionRing.rotation.x = Math.PI / 2;
  selectionRing.visible = false;
  scene.add(selectionRing);

  // 9. Pasang Tombol Masuk VR dari Three.js
  const vrButton = VRButton.createButton(renderer);
  document.getElementById('vr-btn-placeholder').appendChild(vrButton);

  // 10. Load Model GLTF Tata Surya
  loadSolarSystemModel();

  // 11. Event Listeners
  window.addEventListener('resize', onWindowResize);
  setupUIEventListeners();
  setupRaycastListeners();
  setupVRTransitions();

  // 12. Jalankan Render Loop (Menggunakan setAnimationLoop untuk WebXR)
  renderer.setAnimationLoop(animate);
}

// --- PEMBUATAN BINTANG (PARTIKEL) ---
function createStarfield() {
  const starCount = 4000;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(starCount * 3);
  const colors = new Float32Array(starCount * 3);

  for (let i = 0; i < starCount; i++) {
    // Sebarkan bintang secara acak dalam bola berdiameter 100 - 250 unit
    const radius = 100 + Math.random() * 150;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);

    // Variasi warna bintang (60% putih, 25% biru-cyan, 15% kuning-jingga hangat)
    const randColor = Math.random();
    if (randColor < 0.6) {
      colors[i * 3] = 1.0;
      colors[i * 3 + 1] = 1.0;
      colors[i * 3 + 2] = 1.0;
    } else if (randColor < 0.85) {
      colors[i * 3] = 0.7;
      colors[i * 3 + 1] = 0.9;
      colors[i * 3 + 2] = 1.0;
    } else {
      colors[i * 3] = 1.0;
      colors[i * 3 + 1] = 0.95;
      colors[i * 3 + 2] = 0.7;
    }
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  // Tekstur bulat glow buatan menggunakan canvas (tanpa file gambar eksternal)
  const canvas = document.createElement('canvas');
  canvas.width = 16;
  canvas.height = 16;
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.8)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 16, 16);

  const starTexture = new THREE.CanvasTexture(canvas);

  const material = new THREE.PointsMaterial({
    size: 0.7,
    map: starTexture,
    vertexColors: true,
    transparent: true,
    opacity: 0.95,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });

  const starfield = new THREE.Points(geometry, material);
  scene.add(starfield);
}

// --- PEMUATAN MODEL GLB TATA SURYA ---
function loadSolarSystemModel() {
  const loader = new GLTFLoader();
  const progressBar = document.getElementById('progress-bar');
  const loaderStatus = document.getElementById('loader-status');
  const startBtn = document.getElementById('start-btn');

  loader.load(
    '/assets/solar_system_animation.glb',
    (gltf) => {
      const model = gltf.scene;
      scene.add(model);

      // Traversal model untuk mengidentifikasi mesh planet dan orbit
      traverseModel(model);

      // Play orbit animation bawaan GLB
      if (gltf.animations && gltf.animations.length > 0) {
        mixer = new THREE.AnimationMixer(model);
        const action = mixer.clipAction(gltf.animations[0]);
        action.play();
      }

      // Selesai memuat
      progressBar.style.width = '100%';
      loaderStatus.innerText = 'Tata Surya siap dijelajahi!';
      startBtn.disabled = false;
      startBtn.classList.add('show');
    },
    (xhr) => {
      if (xhr.lengthComputable) {
        const percent = Math.round((xhr.loaded / xhr.total) * 100);
        progressBar.style.width = percent + '%';
        loaderStatus.innerText = `Mengunduh model tata surya: ${percent}%`;
      } else {
        loaderStatus.innerText = 'Mengunduh model tata surya...';
      }
    },
    (error) => {
      console.error('Error loading GLB:', error);
      loaderStatus.innerText = 'Gagal memuat model. Hubungkan ke jaringan dan muat ulang halaman.';
    }
  );
}

// --- TRAVERSAL DAN IDENTIFIKASI NODE GLB ---
function traverseModel(model) {
  model.traverse((child) => {
    if (child.isMesh) {
      const name = child.name.toLowerCase();
      
      // Cari apakah mesh ini adalah bagian dari garis orbit (BezierCircle)
      let isOrbit = false;
      let p = child;
      while (p) {
        if (p.name && (p.name.includes('BezierCircle.001') || (p.name.includes('BezierCircle_') && p.name.includes('001')))) {
          isOrbit = true;
          break;
        }
        p = p.parent;
      }

      if (isOrbit || name.includes('beziercircle.001')) {
        orbitLines.push(child);
        // Desain garis orbit glowing cyan transparan
        child.material = new THREE.MeshBasicMaterial({
          color: 0x00f2fe,
          transparent: true,
          opacity: 0.22,
          side: THREE.DoubleSide
        });
        return; // Jangan masukkan garis orbit ke target klik/raycasting
      }

      // Klasifikasi planet berdasarkan kecocokan nama objek/parent
      let planetId = null;
      p = child;
      while (p) {
        const parentName = p.name.toLowerCase();
        if (parentName.includes('sun_53') || parentName.includes('object_56')) {
          planetId = 'sun';
          break;
        } else if (parentName.includes('mercury_2') || parentName.includes('object_5')) {
          planetId = 'mercury';
          break;
        } else if (parentName.includes('venus_5') || parentName.includes('object_8')) {
          planetId = 'venus';
          break;
        } else if (parentName.includes('erath_8') || parentName.includes('object_11')) { // "erath" misspelling in GLB
          planetId = 'earth';
          break;
        } else if (parentName.includes('moon_31') || parentName.includes('object_34')) {
          planetId = 'moon';
          break;
        } else if (parentName.includes('mars_12') || parentName.includes('object_14')) {
          planetId = 'mars';
          break;
        } else if (parentName.includes('jupiter_15') || parentName.includes('object_17')) {
          planetId = 'jupiter';
          break;
        } else if (parentName.includes('saturn_19') || parentName.includes('object_20') || parentName.includes('saturn_ring_18') || parentName.includes('object_22')) {
          planetId = 'saturn';
          break;
        } else if (parentName.includes('uranus_22') || parentName.includes('object_25')) {
          planetId = 'uranus';
          break;
        } else if (parentName.includes('neptune_25') || parentName.includes('object_28')) {
          planetId = 'neptune';
          break;
        } else if (parentName.includes('pluto_28') || parentName.includes('object_31')) {
          planetId = 'pluto';
          break;
        }
        p = p.parent;
      }

      if (planetId) {
        child.userData.planetId = planetId;
        clickableObjects.push(child);

        // Petakan parent utama untuk tracking fokus kamera
        if (!planets[planetId]) {
          // Cari parent tingkat atas tepat di bawah Scene Root Node
          let topParent = child;
          while (topParent.parent && topParent.parent.name !== 'GLTF_SceneRootNode') {
            topParent = topParent.parent;
          }
          planets[planetId] = topParent;
        }
      }
    }
  });

  console.log('Selesai memetakan tata surya:', {
    jumlahPlanet: Object.keys(planets).length,
    meshKlik: clickableObjects.length,
    meshOrbit: orbitLines.length
  });
}

// --- SETUP CONTROLLER VR (WEBXR) ---
function setupVRControllers() {
  const onSelect = (event) => {
    const controller = event.target;
    raycaster.ray.origin.setFromMatrixPosition(controller.matrixWorld);

    const tempMatrix = new THREE.Matrix4();
    tempMatrix.identity().extractRotation(controller.matrixWorld);
    raycaster.ray.direction.set(0, 0, -1).applyMatrix4(tempMatrix);

    const intersects = raycaster.intersectObjects(clickableObjects);
    if (intersects.length > 0) {
      const clickedObj = intersects[0].object;
      const planetId = clickedObj.userData.planetId;
      if (planetId) {
        selectPlanet(planetId);
      }
    }
  };

  // Buat laser pointer untuk 2 controller VR
  for (let i = 0; i < 2; i++) {
    const controller = renderer.xr.getController(i);
    controller.addEventListener('select', onSelect);
    dolly.add(controller);
    activeControllers.push(controller);

    // Laser pointer visual
    const pointerGeom = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, -5)
    ]);
    const pointerMat = new THREE.LineBasicMaterial({
      color: 0x00f2fe,
      transparent: true,
      opacity: 0.6
    });
    const line = new THREE.Line(pointerGeom, pointerMat);
    line.name = 'pointer';
    controller.add(line);
  }
}

// --- SETUP GAZE RETICLE (UNTUK CARDBOARD / TANPA CONTROLLER) ---
function setupVRGazeReticle() {
  const reticleGeometry = new THREE.RingGeometry(0.015, 0.025, 32);
  const reticleMaterial = new THREE.MeshBasicMaterial({
    color: 0x00f2fe,
    depthTest: false,
    depthWrite: false,
    transparent: true,
    opacity: 0.8
  });
  reticle = new THREE.Mesh(reticleGeometry, reticleMaterial);
  reticle.position.z = -1; // Letakkan 1 meter di depan kamera
  reticle.visible = false;
  camera.add(reticle);
}

// --- SETUP 3D INFORMATION PANEL (UNTUK VR HEADSET) ---
function setupVR3DPanel() {
  vrPanelCanvas = document.createElement('canvas');
  vrPanelCanvas.width = 512;
  vrPanelCanvas.height = 320;
  
  vrPanelTexture = new THREE.CanvasTexture(vrPanelCanvas);
  
  const panelGeom = new THREE.PlaneGeometry(1.6, 1.0);
  const panelMat = new THREE.MeshBasicMaterial({
    map: vrPanelTexture,
    transparent: true,
    side: THREE.DoubleSide
  });
  
  vrPanelMesh = new THREE.Mesh(panelGeom, panelMat);
  vrPanelMesh.visible = false;
  scene.add(vrPanelMesh);
}

// Update isi panel 3D VR secara dinamis pada canvas
function updateVR3DPanelContent(planet) {
  const ctx = vrPanelCanvas.getContext('2d');
  ctx.clearRect(0, 0, vrPanelCanvas.width, vrPanelCanvas.height);

  // Background
  ctx.fillStyle = 'rgba(13, 8, 24, 0.88)';
  ctx.fillRect(0, 0, vrPanelCanvas.width, vrPanelCanvas.height);

  // Border glow
  ctx.strokeStyle = '#00f2fe';
  ctx.lineWidth = 4;
  ctx.strokeRect(2, 2, vrPanelCanvas.width - 4, vrPanelCanvas.height - 4);

  // Sudut dekoratif neon pink
  ctx.strokeStyle = '#ff007f';
  ctx.lineWidth = 6;
  // Kiri atas
  ctx.beginPath(); ctx.moveTo(2, 35); ctx.lineTo(2, 2); ctx.lineTo(35, 2); ctx.stroke();
  // Kanan bawah
  ctx.beginPath(); ctx.moveTo(vrPanelCanvas.width - 2, vrPanelCanvas.height - 35); ctx.lineTo(vrPanelCanvas.width - 2, vrPanelCanvas.height - 2); ctx.lineTo(vrPanelCanvas.width - 35, vrPanelCanvas.height - 2); ctx.stroke();

  // Judul & Emoji
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 32px Orbitron, sans-serif';
  ctx.fillText(`${planet.emoji} ${planet.name}`, 30, 55);

  // Tipe
  ctx.fillStyle = '#8e9bb0';
  ctx.font = '16px "Space Grotesk", sans-serif';
  ctx.fillText(planet.type, 30, 82);

  // Divider
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(30, 100); ctx.lineTo(vrPanelCanvas.width - 30, 100); ctx.stroke();

  // Deskripsi
  ctx.fillStyle = '#f0f3f8';
  ctx.font = '15px "Space Grotesk", sans-serif';
  const words = planet.description.split(' ');
  let line = '';
  let y = 130;
  const maxWidth = vrPanelCanvas.width - 60;
  const lineHeight = 20;

  for (let n = 0; n < words.length; n++) {
    let testLine = line + words[n] + ' ';
    let metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      ctx.fillText(line, 30, y);
      line = words[n] + ' ';
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, 30, y);

  // Stats boxes (Diameter & Suhu)
  y = 235;
  // Box 1
  ctx.fillStyle = 'rgba(0, 242, 254, 0.05)';
  ctx.strokeStyle = 'rgba(0, 242, 254, 0.15)';
  ctx.fillRect(30, y, 210, 55);
  ctx.strokeRect(30, y, 210, 55);
  ctx.fillStyle = '#8e9bb0';
  ctx.font = '10px "Space Grotesk", sans-serif';
  ctx.fillText('DIAMETER', 45, y + 20);
  ctx.fillStyle = '#00f2fe';
  ctx.font = 'bold 15px Orbitron, sans-serif';
  ctx.fillText(planet.diameter, 45, y + 40);

  // Box 2
  ctx.fillStyle = 'rgba(0, 242, 254, 0.05)';
  ctx.strokeStyle = 'rgba(0, 242, 254, 0.15)';
  ctx.fillRect(272, y, 210, 55);
  ctx.strokeRect(272, y, 210, 55);
  ctx.fillStyle = '#8e9bb0';
  ctx.font = '10px "Space Grotesk", sans-serif';
  ctx.fillText('SUHU RATA-RATA', 287, y + 20);
  ctx.fillStyle = '#00f2fe';
  ctx.font = 'bold 15px Orbitron, sans-serif';
  ctx.fillText(planet.temp, 287, y + 40);

  // Katakan pada Three.js untuk refresh texture
  vrPanelTexture.needsUpdate = true;
}

// --- EVENT LISTENER & DETEKSI KLIK DESKTOP/MOBILE ---
function setupRaycastListeners() {
  window.addEventListener('pointerdown', (e) => {
    pointerDownX = e.clientX;
    pointerDownY = e.clientY;
  });

  window.addEventListener('pointerup', (e) => {
    // Jika masih di loading screen, abaikan klik
    if (!document.getElementById('loader-container').classList.contains('fade-out')) return;

    // Abaikan klik jika mengenai tombol/elemen HUD HTML
    if (e.target.closest('#hud-container') || e.target.closest('#VRButton')) return;

    // Deteksi drag vs klik (toleransi 6 pixel)
    const diffX = Math.abs(e.clientX - pointerDownX);
    const diffY = Math.abs(e.clientY - pointerDownY);
    
    if (diffX < 6 && diffY < 6) {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(clickableObjects);

      if (intersects.length > 0) {
        const clickedMesh = intersects[0].object;
        const planetId = clickedMesh.userData.planetId;
        if (planetId) {
          selectPlanet(planetId);
        }
      }
    }
  });
}

// --- FUNGSI PILIH PLANET ---
function selectPlanet(planetId) {
  selectedPlanetId = planetId;
  const data = planetInfo[planetId];
  if (!data) return;

  // 1. Update HUD layar 2D
  document.getElementById('planet-emoji').innerText = data.emoji;
  document.getElementById('planet-name').innerText = data.name;
  document.getElementById('planet-type').innerText = data.type;
  document.getElementById('planet-description').innerText = data.description;
  document.getElementById('stat-diameter').innerText = data.diameter;
  document.getElementById('stat-temp').innerText = data.temp;
  document.getElementById('stat-orbit').innerText = data.orbit;
  document.getElementById('stat-moons').innerText = data.moons;

  const factsList = document.getElementById('facts-list');
  factsList.innerHTML = '';
  data.facts.forEach(fact => {
    const li = document.createElement('li');
    li.innerText = fact;
    factsList.appendChild(li);
  });

  document.getElementById('info-panel').classList.remove('hide');

  // Hentikan suara yang sedang membaca jika ada
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }

  // 2. Update HUD 3D VR melayang
  updateVR3DPanelContent(data);
}

// --- TEXT-TO-SPEECH (TTS) BAHASA INDONESIA ---
function speakPlanetDescription(planetId) {
  if (!('speechSynthesis' in window)) {
    alert('Browser Anda tidak mendukung Text-to-Speech.');
    return;
  }

  window.speechSynthesis.cancel();
  const data = planetInfo[planetId];
  if (!data) return;

  const text = `${data.name}. Tipe: ${data.type}. ${data.description} Berdiameter ${data.diameter}. Suhu rata-rata ${data.temp}. Memiliki satelit sebanyak ${data.moons}.`;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'id-ID';

  // Pilih pengisi suara Bahasa Indonesia jika tersedia
  const voices = window.speechSynthesis.getVoices();
  const idVoice = voices.find(v => v.lang.includes('id') || v.lang.includes('ID'));
  if (idVoice) utterance.voice = idVoice;

  const ttsBtn = document.getElementById('tts-btn');
  ttsBtn.style.boxShadow = '0 0 15px var(--primary-glow)';
  ttsBtn.style.borderColor = 'var(--primary)';

  utterance.onend = () => {
    ttsBtn.style.boxShadow = '';
    ttsBtn.style.borderColor = '';
  };
  utterance.onerror = () => {
    ttsBtn.style.boxShadow = '';
    ttsBtn.style.borderColor = '';
  };

  window.speechSynthesis.speak(utterance);
}

// --- SETUP EVENT LISTENER UI HUD ---
function setupUIEventListeners() {
  // Tombol Mulai Jelajah
  const startBtn = document.getElementById('start-btn');
  startBtn.addEventListener('click', () => {
    document.getElementById('loader-container').classList.add('fade-out');
    // Unblock audio context untuk TTS
    if ('speechSynthesis' in window) {
      window.speechSynthesis.speak(new SpeechSynthesisUtterance(''));
    }
  });

  // Tombol TTS
  document.getElementById('tts-btn').addEventListener('click', () => {
    if (selectedPlanetId) {
      speakPlanetDescription(selectedPlanetId);
    }
  });

  // Tombol Tutup Info Panel
  document.getElementById('close-info-btn').addEventListener('click', () => {
    selectedPlanetId = null;
    document.getElementById('info-panel').classList.add('hide');
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  });

  // Tombol Prev & Next Planet
  document.getElementById('prev-planet-btn').addEventListener('click', () => cyclePlanet(-1));
  document.getElementById('next-planet-btn').addEventListener('click', () => cyclePlanet(1));

  // Tombol Play/Pause Orbit
  const playPauseBtn = document.getElementById('play-pause-btn');
  const playIcon = document.getElementById('play-icon');
  const pauseIcon = document.getElementById('pause-icon');

  playPauseBtn.addEventListener('click', () => {
    isAnimating = !isAnimating;
    if (isAnimating) {
      playPauseBtn.classList.add('active');
      playIcon.classList.add('hide');
      pauseIcon.classList.remove('hide');
      if (mixer) mixer.timeScale = animationSpeed;
    } else {
      playPauseBtn.classList.remove('active');
      playIcon.classList.remove('hide');
      pauseIcon.classList.add('hide');
      if (mixer) mixer.timeScale = 0;
    }
  });

  // Slider Kecepatan Orbit
  const speedSlider = document.getElementById('speed-slider');
  speedSlider.addEventListener('input', (e) => {
    animationSpeed = parseFloat(e.target.value);
    if (isAnimating && mixer) {
      mixer.timeScale = animationSpeed;
    }
  });

  // Toggle Tampilkan Garis Orbit
  const orbitToggle = document.getElementById('orbit-toggle');
  orbitToggle.addEventListener('change', (e) => {
    showOrbits = e.target.checked;
    orbitLines.forEach(line => {
      line.visible = showOrbits;
    });
  });

  // Toggle Auto Rotate Kamera
  const autoRotateToggle = document.getElementById('auto-rotate-toggle');
  autoRotateToggle.addEventListener('change', (e) => {
    autoRotateCamera = e.target.checked;
  });

  // Reset View
  const resetViewBtn = document.getElementById('reset-view-btn');
  resetViewBtn.addEventListener('click', () => {
    selectedPlanetId = null;
    document.getElementById('info-panel').classList.add('hide');
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    // Kembalikan target OrbitControls ke pusat
    controls.target.set(0, 0, 0);

    // Memicu lerping posisi kamera ke posisi awal
    targetCameraPosition = new THREE.Vector3(0, 15, 30);
  });
}

function cyclePlanet(direction) {
  let currentIndex = planetOrder.indexOf(selectedPlanetId);
  if (currentIndex === -1) currentIndex = 0;

  let nextIndex = currentIndex + direction;
  if (nextIndex < 0) nextIndex = planetOrder.length - 1;
  if (nextIndex >= planetOrder.length) nextIndex = 0;

  selectPlanet(planetOrder[nextIndex]);
}

// --- SETUP TRANSISI VR (WEBXR EVENTS) ---
function setupVRTransitions() {
  renderer.xr.addEventListener('sessionstart', () => {
    isVR = true;

    // Transisi layar hitam sesaat
    const fadeOverlay = document.getElementById('fade-overlay');
    fadeOverlay.classList.add('fade-in');
    setTimeout(() => fadeOverlay.classList.remove('fade-in'), 600);

    // Sembunyikan HUD HTML di headset VR
    document.getElementById('hud-container').style.display = 'none';

    // Set posisi awal Dolly VR agar pemain tidak tenggelam di tengah matahari
    dolly.position.set(0, 4, 18);
  });

  renderer.xr.addEventListener('sessionend', () => {
    isVR = false;

    // Transisi layar hitam sesaat
    const fadeOverlay = document.getElementById('fade-overlay');
    fadeOverlay.classList.add('fade-in');
    setTimeout(() => fadeOverlay.classList.remove('fade-in'), 600);

    // Munculkan kembali HUD HTML
    document.getElementById('hud-container').style.display = 'flex';

    // Sembunyikan panel 3D
    vrPanelMesh.visible = false;
  });
}

// --- DETEKSI HOVER DAN ANIMASI LASER VR CONTROLLER ---
function updateVRPointerHover() {
  activeControllers.forEach(controller => {
    const pointer = controller.getObjectByName('pointer');
    if (!pointer) return;

    raycaster.ray.origin.setFromMatrixPosition(controller.matrixWorld);

    const tempMatrix = new THREE.Matrix4();
    tempMatrix.identity().extractRotation(controller.matrixWorld);
    raycaster.ray.direction.set(0, 0, -1).applyMatrix4(tempMatrix);

    const intersects = raycaster.intersectObjects(clickableObjects);
    if (intersects.length > 0) {
      pointer.material.color.setHex(0xff007f); // Berubah pink saat hover planet
      pointer.scale.z = intersects[0].distance / 5; // Rentangkan garis laser tepat menyentuh planet
    } else {
      pointer.material.color.setHex(0x00f2fe); // Cyan normal
      pointer.scale.z = 2.0; // Panjang standar laser
    }
  });
}

// --- RENDER & ANIMATION LOOP ---
function animate() {
  const delta = clock.getDelta();

  // 1. Update Mixer untuk rotasi orbit bawaan GLB
  if (mixer && isAnimating) {
    mixer.update(delta);
  }

  // 2. Lerping posisi kamera jika tombol reset ditekan
  if (targetCameraPosition) {
    camera.position.lerp(targetCameraPosition, 0.05);
    if (camera.position.distanceTo(targetCameraPosition) < 0.1) {
      targetCameraPosition = null;
    }
  }

  // 3. Focussing Target: Smoothly lock & follow selected planet
  if (selectedPlanetId) {
    // Cari mesh planet aktif untuk mengambil koordinat dunianya secara real-time
    const activeMesh = clickableObjects.find(c => c.userData.planetId === selectedPlanetId);
    if (activeMesh) {
      const targetWorldPos = new THREE.Vector3();
      activeMesh.getWorldPosition(targetWorldPos);

      // Lerp target kamera ke koordinasi planet
      controls.target.lerp(targetWorldPos, 0.08);

      // Gerakkan Selection Ring melingkari planet tersebut
      if (!activeMesh.geometry.boundingSphere) {
        activeMesh.geometry.computeBoundingSphere();
      }
      const radius = activeMesh.geometry.boundingSphere.radius;
      const scaleFactor = radius * 1.5;

      selectionRing.position.copy(targetWorldPos);
      selectionRing.scale.set(scaleFactor, scaleFactor, scaleFactor);
      selectionRing.rotation.z += 0.01;
      selectionRing.visible = true;

      // Logika VR: Panel 3D melayang diposisikan di atas planet yang dipilih menghadap user
      if (isVR) {
        // Posisikan melayang 1.4 unit di atas planet dan sedikit condong ke kamera
        const panelOffset = new THREE.Vector3(0, 1.4, 0.6);
        vrPanelMesh.position.copy(targetWorldPos).add(panelOffset);
        vrPanelMesh.lookAt(camera.position); // Selalu menghadap ke pemain
        vrPanelMesh.visible = true;

        // Dolly VR: Lerp agar pemain perlahan mengikuti posisi planet secara teratur
        const targetDollyPos = targetWorldPos.clone().add(new THREE.Vector3(0, 0.6, 3));
        dolly.position.lerp(targetDollyPos, 0.04);
      }
    }
  } else {
    // Kembali mengorbit pusat (Matahari)
    controls.target.lerp(new THREE.Vector3(0, 0, 0), 0.05);
    selectionRing.visible = false;
    if (isVR) vrPanelMesh.visible = false;
  }

  // 4. Sinkronisasi status Auto Rotate Kamera
  controls.autoRotate = autoRotateCamera && !selectedPlanetId;
  controls.update();

  // 5. Logika Interaksi VR (Gaze Reticle vs Laser Controller)
  if (isVR) {
    // Periksa apakah ada controller fisik VR yang aktif (Quest, Rift, etc.)
    let hasControllers = false;
    const session = renderer.xr.getSession();
    if (session && session.inputSources) {
      for (const source of session.inputSources) {
        if (source.targetRayMode === 'tracked-pointer') {
          hasControllers = true;
        }
      }
    }

    if (!hasControllers) {
      // Aktifkan reticle gaze jika tanpa controller (Mobile VR Cardboard)
      reticle.visible = true;

      // Tembakkan raycaster lurus ke depan dari pandangan kamera
      raycaster.setFromCamera(new THREE.Vector2(0, 0), camera);
      const intersects = raycaster.intersectObjects(clickableObjects);

      if (intersects.length > 0) {
        const hoveredMesh = intersects[0].object;
        reticle.material.color.setHex(0xff007f); // Warna pink saat membidik

        if (gazeTarget === hoveredMesh) {
          const elapsed = clock.getElapsedTime() - gazeTime;
          
          // Efek visual: Reticle menyusut tanda pengisian durasi klik (1.5 detik)
          const shrinkScale = Math.max(0.3, 1.0 - (elapsed / 1.5) * 0.7);
          reticle.scale.set(shrinkScale, shrinkScale, 1);

          if (elapsed > 1.5) {
            const planetId = hoveredMesh.userData.planetId;
            if (planetId) {
              selectPlanet(planetId);
            }
            gazeTarget = null; // Reset bidikan
          }
        } else {
          gazeTarget = hoveredMesh;
          gazeTime = clock.getElapsedTime();
          reticle.scale.set(1, 1, 1);
        }
      } else {
        reticle.material.color.setHex(0x00f2fe); // Cyan normal jika bidikan kosong
        reticle.scale.set(1, 1, 1);
        gazeTarget = null;
      }
    } else {
      // Sembunyikan Gaze Reticle & gunakan Laser Pointer jika controller terdeteksi
      reticle.visible = false;
      gazeTarget = null;
      updateVRPointerHover();
    }
  }

  // 6. Render Frame
  renderer.render(scene, camera);
}

// --- HANDLING WINDOW RESIZE ---
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
