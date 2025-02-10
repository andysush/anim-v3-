import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.164.0/build/three.module.min.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.164.0/examples/jsm/controls/OrbitControls.js";
import texturePath from "./public/logo-min.svg";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	100
);

camera.position.z = 5;

const ambientLight = new THREE.AmbientLight("white", 0.6);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight("white", 1);
dirLight.position.set(5, 5, 5);
scene.add(dirLight);

// pointLight.position.set(1.5, 2, 2);
// scene.add(pointLight);

// const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.5);
// scene.add(pointLightHelper);

// const spotLight = new THREE.SpotLight("white", 1);
// spotLight.position.set(1, 1, 1);
// scene.add(spotLight);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.minDistance = 2;
controls.maxDistance = 10;

const texture = new THREE.TextureLoader().load(texturePath);
const textureMaterial = new THREE.MeshStandardMaterial({ map: texture });

const cubeGeometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
const cube = new THREE.Mesh(cubeGeometry, textureMaterial);
cube.position.set(0.0, 0.0, 0.0);
scene.add(cube);

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onClick(ev) {
	mouse.x = (ev.clientX / window.innerWidth) * 2 - 1;
	mouse.y = -(ev.clientX / window.innerHeight) * 2 + 1;

	raycaster.setFromCamera(mouse, camera);
}

window.addEventListener("click", onClick);

function animate() {
	requestAnimationFrame(animate);
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	// sphere.rotation.y += 0.01;
	// torus.rotation.x += 0.01;
	// torus.rotation.y += 0.01;
	controls.update();
	renderer.render(scene, camera);
}
animate();
