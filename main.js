import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { TextureLoader } from 'three';

const scene = new THREE.Scene();
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)
const canvas = document.querySelector('canvas.app');

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true
});

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.dampingFactor = 0.1;
controls.target.set(0,0,0);

const loadingManager = new THREE.LoadingManager(
  //loaded
  () => {
  },
  //progress
  (itemURL, itemsLoaded, itemsTotal) => {
  },
  //error
  () => {
    console.log(urlError);
  }
);

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(sizes.width, sizes.height)
camera.position.set(0,5,5);
scene.add(camera);

// Sizes
window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const dracoLoader = new DRACOLoader(loadingManager);
dracoLoader.setDecoderPath('/draco/');
const gltfLoader = new GLTFLoader(loadingManager);
gltfLoader.setDRACOLoader(dracoLoader);
const textureLoader = new THREE.TextureLoader(loadingManager);

/**
 * 
 * 
 * 
 * 
 * 
 */

const cubeMesh = new THREE.Mesh(
  new THREE.BoxGeometry(2,2,2),
  new THREE.MeshBasicMaterial({color: 0xff00ff})
);
cubeMesh.position.y = 1;
scene.add(cubeMesh);

/**
 * 
 * 
 * 
 * 
 * 
 */

const gridHelper = new THREE.GridHelper(10,10);
scene.add(gridHelper);

const clock = new THREE.Clock();
const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  controls.update();

  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
}
tick();