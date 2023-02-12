/* global THREE */
import * as THREE from 'three';

let scene;
let camera;
let renderer;
let cube;
let plane1;
let plane2;

function setup() {
  setupScene();
  setupRenderer();
  setupEventListeners();
  setupCamera();
  setupLights();

  let video1 = setUpVideo(
    "https://www.youtube.com/embed/anEAQ4epzoI?mute=1&autoplay=1"
  );
  // let video2 = setUpVideo(
  //   "https://cdn.glitch.com/39b7ba95-a96e-44aa-9110-0d917a3046ad%2FOutro_Vid_v2.mp4?v=1596058679403"
  // );

  let texture1 = createTextureFromVideoElement(video1);
  // let texture2 = createTextureFromVideoElement(video2);
  // texture.crossOrigin = "anonymous";

  plane1 = new THREE.Mesh(
    new THREE.PlaneGeometry(.5, .5),
    new THREE.MeshBasicMaterial({ map: texture1, side: THREE.DoubleSide })
    
  );

  scene.add(plane1);
  draw();
}

function setupScene() {
  scene = new THREE.Scene();
}

function setupCamera() {
  let res = window.innerWidth / window.innerHeight;
  camera = new THREE.PerspectiveCamera(75, res, 0.1, 1000);
  camera.position.z = 1;
}

// https://stackoverflow.com/questions/19251983/dynamically-create-a-html5-video-element-without-it-being-shown-in-the-page/20611625

function setUpVideo(inSrc) {
  var videlem = document.createElement("video");
  /// ... some setup like poster image, size, position etc. goes here...
  /// now, add sources:
  var sourceMP4 = document.createElement("source");
  sourceMP4.type = "video/mp4";
  sourceMP4.src = inSrc;
  // performance
  

  videlem.appendChild(sourceMP4);

  videlem.autoplay = true;
  videlem.muted = true;
  videlem.setAttribute("crossorigin", "anonymous");
  // i think this will not be not be needed if you have a server

  videlem.style.display = "none"; // this makes it so the html element isnt there

  videlem.load();
  videlem.play();
  return videlem;
}

function createTextureFromVideoElement(video) {
  let texture = new THREE.VideoTexture(video);
  texture.crossOrigin = "anonymous";
  texture.needsUpdate;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  // texture.format = THREE.RGBFormat;
  return texture;
}

function setupRenderer() {
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
}

function setupLights() {
  let ambientLight = new THREE.AmbientLight(0x0c0c0c);
  scene.add(ambientLight);

  let spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(-30, 60, 60);
  spotLight.castShadow = true;
  scene.add(spotLight);
}

function setupEventListeners() {
  window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function draw() {
  requestAnimationFrame(draw);
  renderer.render(scene, camera);

  let angle = 0.007;
  // plane1.rotation.x += angle;
  // plane1.rotation.y += angle * 0.125;
  
  // plane2.rotation.x -= angle;
  // plane2.rotation.y -= angle * 0.99;
  
 // camera.position.x += 0.01;
}

setup();
