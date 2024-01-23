import './style.css';

import * as THREE from 'three';
import {OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

//---------------------------
//


const spaceTexture = new THREE.TextureLoader().load('img/fondo_minion.jpg');
scene.background = spaceTexture

//---------------------------
//Creacion del objeto y su material
const mini = new THREE.TextureLoader().load('img/minion.jpg'); 
const geometry = new THREE.CapsuleGeometry( 5, 4, 7, 10 ); 
//const material = new THREE.MeshBasicMaterial( {color: 0xffd700, wireframe: true} );
//const material = new THREE.MeshStandardMaterial( {color: 0xffd700} ); 
const material = new THREE.MeshStandardMaterial( {map:mini,} ); 
const capsule = new THREE.Mesh( geometry, material ); 

scene.add(capsule)

//-----------------------------
//Luz ambiental y punto de luz
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(1,11,1)
pointLight.intensity = 20;

const ambientLight = new THREE.AmbientLight( 0x999999 ); 
scene.add( pointLight, ambientLight );

//----------------------------
//Hace visibles las cosas (luz, esenario)
const lightHepler = new THREE.PointLightHelper(pointLight)
const gridHepler = new THREE.GridHelper(200,50);
scene.add(lightHepler, gridHepler)

//-----------------------------
//controles de movimiento, Antes se deben de importar
const controls = new OrbitControls(camera, renderer.domElement);

//----------------------------
//Añade estrellas
function addStar(){
  const geometry = new THREE.SphereGeometry (1, 24,24);
  const material = new THREE.MeshStandardMaterial( {color: 0x0000bb} ); 
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100) );

  star.position.set(x, y, z);
  scene.add(star)
}
Array(300).fill().forEach(addStar)

//-----------------------------
//Animacion de giro
function animate(){
  requestAnimationFrame(animate);
    capsule.rotation.x += 0.01;
    capsule.rotation.y += 0.005;
    capsule.rotation.z += 0.01;

    controls.update();
  renderer.render(scene, camera);
}
animate()