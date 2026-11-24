import * as THREE from 'three';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1a0a21);

// Camera Orbital
const camera = new THREE.PerspectiveCamera(60, (window.innerWidth / 2) / window.innerHeight, 0.1, 100);
camera.position.set(0, 2, 6);
camera.lookAt(0, 0, 0);

// Frustum Helper
const cameraHelper = new THREE.CameraHelper(camera);
scene.add(cameraHelper);

// Camera Fixa
const secondCamera = new THREE.PerspectiveCamera(50, (window.innerWidth / 2) / window.innerHeight, 0.1, 100);
secondCamera.position.set(0, 12, 16);
secondCamera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Para que as sombras aparecerem e sejam desenhadas, o motor de renderizar do Three.js precisa receber os mapeamentos das sombras
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;  // Aqui estou definindo o tipo da sombra (Bordas suaves e realistas) Onde segundo a doc é o padrão: https://threejs.org/docs/index.html#WebGLRenderer.shadowMap
document.body.appendChild(renderer.domElement);

// Controles Orbitais da Câmera
// const controls = new OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true;
// controls.dampingFactor = 0.05;

// Ajustando o AmbientLight e o DirectionalLight para se propagar a todo o ambiente e colocando a luz na fogueira.
// --- ILUMINAÇÃO (Requisito M2: 2 tipos de luz e sombras configuradas)  OBS: Apoio da IA Gemini ---
const ambientLight = new THREE.AmbientLight(0x050096, 0.4); 
scene.add(ambientLight);

// 2. DirectionalLight: Simula uma fonte de luz distante (Luar/Sol). Seus raios são paralelos.
const moonLight = new THREE.DirectionalLight(0x90b0d0, 1.5); 
moonLight.position.set(10, 20, 10);
moonLight.castShadow = true; // Permite que a luz projete sombras

// Configuração da câmera ortográfica
moonLight.shadow.camera.left = -10;
moonLight.shadow.camera.right = 10;
moonLight.shadow.camera.top = 10;
moonLight.shadow.camera.bottom = -10;

// Resolução da textura da sombra (Se colocar um valor maior vai ficar mais pesado haha)
moonLight.shadow.mapSize.width = 2048; 
moonLight.shadow.mapSize.height = 2048;
scene.add(moonLight);

// 3. PointLight: Emite luz de um único ponto em todas as direções (Fogueira).
const campfireLight = new THREE.PointLight(0xff7700, 1, 15); // Cor laranja, intensidade 8, distância/decaimento 15

// A posição deve ficar próxima/dentro do acampamento
campfireLight.position.set(-0.145, 0.13, 0.13);
campfireLight.castShadow = true; 
campfireLight.shadow.mapSize.width = 1024;
campfireLight.shadow.mapSize.height = 1024;
scene.add(campfireLight);

const texturaFogo = new THREE.TextureLoader().load('assets/campsite/fogo.png');
const materialFogo = new THREE.SpriteMaterial({ map: texturaFogo});
const spriteFogo = new THREE.Sprite(materialFogo);

spriteFogo.scale.set(0.05, 0.05, 1);
spriteFogo.position.set(-0.145, 0.13, 0.13);

scene.add(spriteFogo);

// Material de Profundidade
const depthMaterial = new THREE.MeshDepthMaterial();

// Carregadores
const gltfLoader = new GLTFLoader();
const objLoader = new OBJLoader();
const mtlLoader = new MTLLoader();
const textureLoader = new THREE.TextureLoader();

const myTexture = textureLoader.load('assets/campsite/Texture.png');
myTexture.flipY = true; 
myTexture.colorSpace = THREE.SRGBColorSpace;

//  Atualização das funçẽos de carregamento dos modelos

// Essa função recebe um modelo 3D carregado via GLTFLoader e o prepara para ser adicionado à cena.
function loadCampsite(gltf) {
    gltf.scene.scale.set(0.0003, 0.0003, 0.0003);
    gltf.scene.position.set(0, 0.105, 0);

    // Aqui o traverse(callback) meio que faz um retorno nos objetos recursivamente, em profundidade. --> https://threejs.org/docs/pages/Object3D.html
    gltf.scene.traverse(function (node) {
        if (node.isMesh) {
            node.material.map = myTexture;
            node.material.needsUpdate = true;

            node.castShadow = true;
            node.receiveShadow = true;
        }
    });
    scene.add(gltf.scene);
}

// Daqui pra baixo o padrão é carregar → escalar → posicionar → traverse para sombras → scene.add) 

let fox;
let mixer;
let animations = {};
let animacaoAtual;

function loadFox(gltf) {

    console.log(gltf.animations); // Exibe as animações disponíveis no console
    fox = gltf.scene;

    fox.scale.set(0.02, 0.02, 0.02);
    fox.position.set(0, 0.190, 0.5);
    fox.rotation.y = Math.PI;

    fox.traverse(function (node) {
        if (node.isMesh) {
            node.castShadow = true;
            node.receiveShadow = true;
        }
    });

    scene.add(fox);

    // Cria o controlador de animações
    mixer = new THREE.AnimationMixer(fox);

    // Armazena todas as animações disponíveis
    gltf.animations.forEach((animation) => {
        animations[animation.name] = mixer.clipAction(animation);
    });

    // Inicia a animação de repouso
    mudarAnimacao('idle');
}

function mudarAnimacao(nome) {

    if (!animations[nome]) return;

    if (animacaoAtual === animations[nome]) return;

    if (animacaoAtual) {
        animacaoAtual.stop();
    }

    animacaoAtual = animations[nome];

    animacaoAtual.reset();
    animacaoAtual.play();
}

function loadSky(gltf) {
    gltf.scene.scale.set(0.3, 0.3, 0.3);
    gltf.scene.position.set(0, 0, 0);
    gltf.scene.traverse((node) => {
        if (node.isMesh) {
            node.userData.ignoreManualFrustumCulling = true;
            node.frustumCulled = false;
        }
    });
    scene.add(gltf.scene);
}

function loadForest(object) {
    object.traverse(function (node) {
        if (node.isMesh) {
            node.castShadow = true;
            node.receiveShadow = true;
        }
    });
    scene.add(object);
}

function loadForestMaterials(materials) {
    materials.preload();
    objLoader.setMaterials(materials);
}

function loadForestTexture(texture) {
    const material = new THREE.MeshStandardMaterial({ map: texture });
    objLoader.setMaterials(material);
}

mtlLoader.load('assets/forest/scene.mtl', loadForestMaterials);
textureLoader.load('assets/forest/scene.png', loadForestTexture);

gltfLoader.load("assets/fox/scene.gltf", loadFox);
gltfLoader.load("assets/campsite/scene.gltf", loadCampsite);
gltfLoader.load("assets/sky/scene.gltf", loadSky);
objLoader.load("assets/forest/scene.obj", loadForest);

// GUI

const params = {
    wireframe: false,
    showDepth: false,
    backFaceCulling: true,
    splitViewport: true,
    showCameraHelper: true,
    frustumCulling: true,
    drawCalls: 0,
    triangles: 0
};

const gui = new GUI({ title: 'Controles da Cena' });

gui.add(params, 'wireframe').name('Wireframe').onChange((value) => {
    scene.traverse((node) => {
        if (node.isMesh && node.material) {
            if (Array.isArray(node.material)) {
                node.material.forEach((mat) => (mat.wireframe = value));
            } else {
                node.material.wireframe = value;
            }
        }
    });
});

gui.add(params, 'showDepth').name('Modo Profundidade').onChange((value) => {
    scene.overrideMaterial = value ? depthMaterial : null;
});

gui.add(params, 'backFaceCulling').name('Back-face Culling').onChange((value) => {
    scene.traverse((node) => {
        if (node.isMesh && node.material) {
            const sideValue = value ? THREE.FrontSide : THREE.DoubleSide;
            if (Array.isArray(node.material)) {
                node.material.forEach((mat) => {
                    mat.side = sideValue;
                    mat.needsUpdate = true;
                });
            } else {
                node.material.side = sideValue;
                node.material.needsUpdate = true;
            }
        }
    });
});

const cameraFolder = gui.addFolder('Visão & Frustum Helper');
cameraFolder.add(params, 'splitViewport').name('Viewport Dividida').onChange(onWindowResize);
cameraFolder.add(params, 'showCameraHelper').name('Exibir Frustum Helper').onChange((value) => {
    cameraHelper.visible = value;
});

const statsFolder = gui.addFolder('Estatísticas (renderer.info)');
statsFolder.add(params, 'frustumCulling').name('Frustum Culling');

statsFolder.add(params, 'drawCalls').name('Draw Calls').listen().disable();
statsFolder.add(params, 'triangles').name('Triângulos').listen().disable();

window.addEventListener('resize', onWindowResize);

function onWindowResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    renderer.setSize(width, height);

    if (params.splitViewport) {
        camera.aspect = (width / 2) / height;
        secondCamera.aspect = (width / 2) / height;
    } else {
        camera.aspect = width / height;
    }

    camera.updateProjectionMatrix();
    secondCamera.updateProjectionMatrix();
}

// Frustum Culling Manual
const projScreenMatrix = new THREE.Matrix4();
const frustum = new THREE.Frustum();

function applyOrbitalFrustumCulling() {
    // Atualiza o Matrix4 da Camera
    camera.updateMatrixWorld();
    projScreenMatrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
    frustum.setFromProjectionMatrix(projScreenMatrix);

    scene.traverse((node) => {
        if (node.isMesh && !node.userData.ignoreManualFrustumCulling) {
            if (!node.geometry.boundingBox) {
                node.geometry.computeBoundingBox();
            }

            if (params.frustumCulling) {
                const bbox = node.geometry.boundingBox.clone().applyMatrix4(node.matrixWorld);
                // Testa interseção com o frustum da CÂMERA ORBITAL
                node.visible = frustum.intersectsBox(bbox);
            } else {
                node.visible = true;
            }

            // Desativa culling automatico para fazer o culling manual
            node.frustumCulled = false;
        }
    });

}

const keys = {}; // Armazena o estado das teclas pressionadas

window.addEventListener('keydown', (event) => { // Verificar se a tecla foi pressionada
    keys[event.code] = true;
});

window.addEventListener('keyup', (event) => { // Verificar se a tecla foi liberada
    keys[event.code] = false;
});

const clock = new THREE.Clock();

const velocidade = 0.5;
const velocidadeRotacao = 2;
let anguloFox = Math.PI;

function movimentarFox(deltaTime) {

    if (!fox) return;

    // Rotação para esquerda
    if (keys.ArrowLeft || keys.KeyA) {
        anguloFox += velocidadeRotacao * deltaTime;
    }

    // Rotação para direita
    if (keys.ArrowRight || keys.KeyD) {
        anguloFox -= velocidadeRotacao * deltaTime;
    }

    fox.rotation.y = anguloFox;

    // Movimentação para frente
    if (keys.ArrowUp || keys.KeyW) {
        fox.translateZ(velocidade * deltaTime);
    }

    // Movimentação para trás
    if (keys.ArrowDown || keys.KeyS) {
        fox.translateZ(-velocidade * deltaTime);
    }

    // Controle das animações (precisam ficar separadas das teclas por causa da animação idle. Eu teria que botar um else if em cada uma das setas e aí a raposa nao andaria em diagonal)
    if (keys.ArrowLeft || keys.KeyA) {

        if (keys.ArrowDown || keys.KeyS) {
            animacaoAtual.timeScale = -1;
            fox.scale.x = -0.02;
        } else {
            animacaoAtual.timeScale = 1;
            fox.scale.x = 0.02;
        }

        mudarAnimacao('walk.left');

    } else if (keys.ArrowRight || keys.KeyD){

        if (keys.ArrowDown || keys.KeyS) {
            animacaoAtual.timeScale = -1;
            fox.scale.x = 0.02;
        } else {
            animacaoAtual.timeScale = 1;
            fox.scale.x = -0.02;
        }

        mudarAnimacao('walk.left');

    } else if (keys.ArrowUp || keys.KeyW ) {

        mudarAnimacao('walk');
        animacaoAtual.timeScale = 1;

    } else if (keys.ArrowDown || keys.KeyS) {
        
        mudarAnimacao('walk');
        animacaoAtual.timeScale = -1;

    } else {
        mudarAnimacao('idle');
    }
}

function atualizarCamera() {

    if (!fox) return;

    const distancia = 0.5;
    const altura = 0.3;

    camera.position.set(
        fox.position.x - Math.sin(fox.rotation.y) * distancia,
        fox.position.y + altura,
        fox.position.z - Math.cos(fox.rotation.y) * distancia
    );

    camera.lookAt(fox.position);
}

function animate() {
    requestAnimationFrame(animate);

    const deltaTime = clock.getDelta();

    movimentarFox(deltaTime);

    if (mixer) {
        mixer.update(deltaTime);
    }

    atualizarCamera();

    camera.updateMatrixWorld();

    cameraHelper.update();

    applyOrbitalFrustumCulling();

    // controls.update();

    if (params.splitViewport) {
        const width = window.innerWidth;
        const height = window.innerHeight;

        renderer.setScissorTest(true);

        // Viewport 1
        renderer.setViewport(0, 0, width / 2, height);
        renderer.setScissor(0, 0, width / 2, height);
        cameraHelper.visible = false;
        renderer.render(scene, camera);

        // Viewport 2
        renderer.setViewport(width / 2, 0, width / 2, height);
        renderer.setScissor(width / 2, 0, width / 2, height);
        cameraHelper.visible = params.showCameraHelper;
        renderer.render(scene, secondCamera);

        renderer.setScissorTest(false);
    } else {
        renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
        renderer.render(scene, camera);
    }

    // Atualiza estatísticas do renderer em tempo real
    params.drawCalls = renderer.info.render.calls;
    params.triangles = renderer.info.render.triangles;
}

animate();