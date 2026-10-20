import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {OBJLoader} from 'three/addons/loaders/OBJLoader.js';

// Configuração de Ambiente

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 2, 6);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Luz Ambiente
const ambientLight = new THREE.AmbientLight(0xdff0ff, 0.6); 
scene.add(ambientLight);

// Luz Direcional
const sunLight = new THREE.DirectionalLight(0xfff5e6, 2.5);
sunLight.position.set(10, 20, 10);
sunLight.castShadow = true; 

// Sombras da Luz Direcional
sunLight.shadow.mapSize.width = 2048;
sunLight.shadow.mapSize.height = 2048;
sunLight.shadow.camera.near = 0.5;
sunLight.shadow.camera.far = 50;

const d = 15;

sunLight.shadow.camera.left = -d;
sunLight.shadow.camera.right = d;
sunLight.shadow.camera.top = d;
sunLight.shadow.camera.bottom = -d;

scene.add(sunLight);

// Configuração de Modelos
const gltfLoader = new GLTFLoader();
const objLoader = new OBJLoader();

function loadGLTF( gltf ) {
   console.log( gltf );
   scene.add( gltf.scene );
}

function loadOBJ( object ){
    console.log( object );
    scene.add( object );
}

gltfLoader.load("assets/fox/scene.gltf", loadGLTF);
gltfLoader.load("assets/campsite/scene.gltf", loadGLTF);
objLoader.load("assets/forest/scene.obj", loadOBJ)


function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();