    import * as THREE from 'three';
    import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
    import {OBJLoader} from 'three/addons/loaders/OBJLoader.js';
    import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

    // Configuração de Ambiente

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xDDDDEE); // Cor de fundo do céu


    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 2, 6);
    camera.lookAt(0, 0, 0);


    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
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
    const mtlLoader = new MTLLoader();
    const textureLoader = new THREE.TextureLoader();

    const myTexture = textureLoader.load('assets/campsite/Texture.png');

    myTexture.flipY = true; 
    myTexture.colorSpace = THREE.SRGBColorSpace;

    function loadCampsite( gltf ) {

        console.log( gltf );

        gltf.scene.scale.set(0.0003, 0.0003, 0.0003);
        gltf.scene.position.set(0,0.105,0);

            gltf.scene.traverse(function (node) {
            if (node.isMesh) {
                // Apply texture to the mesh material
                node.material.map = myTexture;
                
                // Tell Three.js to recompile the material
                node.material.needsUpdate = true;
            }
        });

        scene.add( gltf.scene );
    }

    function loadFox( gltf ) {

        console.log( gltf );

        gltf.scene.scale.set(0.02, 0.02, 0.02);
        gltf.scene.position.set(0,0.190,0.5);
        gltf.scene.rotation.y = Math.PI; // Rotaciona o modelo 180 graus

        scene.add( gltf.scene );
    }


    function loadForest( object ){

        console.log( object );
        scene.add( object );
    }

    function loadForestMaterials( materials ){
        materials.preload();
        objLoader.setMaterials( materials );
    }

    function loadForestTexture( texture ){
        const material = new THREE.MeshStandardMaterial({ map: texture });
        objLoader.setMaterials( material );
    }

    mtlLoader.load( 'assets/forest/scene.mtl', loadForestMaterials );
    textureLoader.load( 'assets/forest/scene.png', loadForestTexture );

    gltfLoader.load("assets/fox/scene.gltf", loadFox);
    gltfLoader.load("assets/campsite/scene.gltf", loadCampsite);
    objLoader.load("assets/forest/scene.obj", loadForest);


    function animate() {
        requestAnimationFrame(animate);

        controls.update(); // Atualiza os controles de órbita

        renderer.render(scene, camera);
    }

    animate();