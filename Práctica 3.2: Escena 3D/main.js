import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

const lienzo = document.querySelector('#lienzo-escena-nuevo');
const escena = new THREE.Scene();
escena.background = new THREE.Color(0x241b36);

const relacionAspecto = window.innerWidth / window.innerHeight;
const camara = new THREE.PerspectiveCamera(65, relacionAspecto, 0.1, 1000);
camara.position.set(0, 0.5, 7);

const renderizador = new THREE.WebGLRenderer({
  canvas: lienzo,
  antialias: true
});
renderizador.setSize(window.innerWidth, window.innerHeight);
renderizador.setPixelRatio(window.devicePixelRatio);

// Objetos exclusivos para este proyecto
const geometriaIcosaedro = new THREE.IcosahedronGeometry(0.85);
const materialIcosaedro = new THREE.MeshStandardMaterial({
  color: 0xff8c42,
  metalness: 0.32,
  roughness: 0.45
});
const icosaedro = new THREE.Mesh(geometriaIcosaedro, materialIcosaedro);
icosaedro.position.set(-2.6, 0, 0);
escena.add(icosaedro);

const geometriaNudoToro = new THREE.TorusKnotGeometry(0.72, 0.26, 85, 14);
const materialNudoToro = new THREE.MeshStandardMaterial({
  color: 0x34ffc7,
  metalness: 0.55,
  roughness: 0.22
});
const nudoToro = new THREE.Mesh(geometriaNudoToro, materialNudoToro);
nudoToro.position.set(0, 0, 0);
escena.add(nudoToro);

const geometriaPrismaHexagonal = new THREE.CylinderGeometry(0, 0.72, 1.45, 6);
const materialPrismaHexagonal = new THREE.MeshStandardMaterial({
  color: 0x8c42ff,
  metalness: 0.22,
  roughness: 0.58
});
const prismaHexagonal = new THREE.Mesh(geometriaPrismaHexagonal, materialPrismaHexagonal);
prismaHexagonal.position.set(2.6, 0, 0);
escena.add(prismaHexagonal);

// Iluminación
const luzAmbiental = new THREE.AmbientLight(0xffffff, 0.33);
escena.add(luzAmbiental);

const luzPrincipal = new THREE.DirectionalLight(0xffffff, 0.78);
luzPrincipal.position.set(3.2, 5.3, 4.1);
escena.add(luzPrincipal);

const luzMovil = new THREE.PointLight(0xff427b, 0.62, 22);
luzMovil.position.set(-1.6, 1.3, 1.1);
escena.add(luzMovil);

// Animaciones únicas
function animar() {
  requestAnimationFrame(animar);

  icosaedro.rotation.x += 0.012;
  icosaedro.rotation.y += 0.009;

  nudoToro.rotation.y += 0.015;
  nudoToro.rotation.z += 0.007;

  prismaHexagonal.rotation.x += 0.01;

  luzMovil.position.y = Math.sin(Date.now() * 0.0011) * 2;
  luzMovil.position.x = Math.cos(Date.now() * 0.0009) * 2.2;

  renderizador.render(escena, camara);
}
animar();

// Ajuste al redimensionar ventana
window.addEventListener('resize', () => {
  camara.aspect = window.innerWidth / window.innerHeight;
  camara.updateProjectionMatrix();
  renderizador.setSize(window.innerWidth, window.innerHeight);
})
