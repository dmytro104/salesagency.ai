import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// For new nav bar on smaller screens
const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
	bar.addEventListener('click', () => {
		nav.classList.add('active');
	})
}

if (close) {
	close.addEventListener('click', (event) => {
		event.preventDefault();
		nav.classList.remove('active');
	})
}

if (close) {
	document.addEventListener('keydown', (event, keyCode) => {
		if (event.keyCode === 27) {
			event.preventDefault();
			nav.classList.remove('active');
		}
	})
}

if (close) {
	close.addEventListener('keydown', (event, keyCode) => {
		if (event.keyCode === 27) {
			event.preventDefault();
			nav.classList.remove('active');
		}
	})
}

//FAQ section
const dropDownButton1 = document.getElementById('open-question1');
const closeQuestion1 = document.querySelector('.close-question1');
const faqAnswer1 = document.querySelector('.answer1');

const dropDownButton2 = document.getElementById('open-question2');
const closeQuestion2 = document.querySelector('.close-question2');
const faqAnswer2 = document.querySelector('.answer2');

const dropDownButton3 = document.getElementById('open-question3');
const closeQuestion3 = document.querySelector('.close-question3');
const faqAnswer3 = document.querySelector('.answer3');

function expandQuestion(dropDownButton, answerSection, closeAnswerButton) {
	dropDownButton.addEventListener('click', (event) => {
		event.preventDefault()
		answerSection.style.display = 'block';
		dropDownButton.style.display = 'none';
		closeAnswerButton.style.display = 'block';
	});
}

function closeQuestion(closeAnswerButton, answerSection, dropDownButton) {
	closeAnswerButton.addEventListener('click', (event) => {
		event.preventDefault()
		answerSection.style.display = 'none';
		closeAnswerButton.style.display = 'none';
		dropDownButton.style.display = 'block';
	});
}

function closeQuestionEsc(closeAnswerButton, answerSection, dropDownButton) {
	document.addEventListener('keydown', (event, keyCode) => {
		if (event.keyCode === 27) {
			event.preventDefault()
			answerSection.style.display = 'none';
			closeAnswerButton.style.display = 'none';
			dropDownButton.style.display = 'block';
		}	
	});
}

expandQuestion(dropDownButton1, faqAnswer1, closeQuestion1);
closeQuestion(closeQuestion1, faqAnswer1, dropDownButton1);
closeQuestionEsc(closeQuestion1, faqAnswer1, dropDownButton1);

expandQuestion(dropDownButton2, faqAnswer2, closeQuestion2);
closeQuestion(closeQuestion2, faqAnswer2, dropDownButton2);
closeQuestionEsc(closeQuestion2, faqAnswer2, dropDownButton2);

expandQuestion(dropDownButton3, faqAnswer3, closeQuestion3);
closeQuestion(closeQuestion3, faqAnswer3, dropDownButton3);
closeQuestionEsc(closeQuestion3, faqAnswer3, dropDownButton3);


// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(event) {
        event.preventDefault();
  
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
  
        if (targetElement) {
            // Calculate the target element's position
            const offset = targetElement.offsetTop - 30;
            const duration = 800; // Adjust the duration as needed
  
            // Scroll smoothly to the target element
            window.scrollTo({
                top: offset,
                behavior: 'smooth',
                duration: duration, // Some browsers may not support this
            });
        }
    });
});  
  


// Code for adding in GLTF 3D model
var scene = new THREE.Scene();
var height = 200;
var width = window.innerWidth - 17;
var camera = new THREE.PerspectiveCamera(30, width/height, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
renderer.setClearColor(0x222222)
var container = document.getElementById('model-container');
container.appendChild(renderer.domElement);

var loader = new GLTFLoader();

var obj;
loader.load("scene.gltf", function(gltf){
    obj = gltf.scene;
    scene.add(gltf.scene);

    // Call the function to change the color after the model is loaded
    changeModelColor(obj, 0x8F388D);

    animate();
});

var light = new THREE.HemisphereLight(0xffffff, 0x000000, 2);
scene.add(light);
camera.position.set(0, 5, 30);

function changeModelColor(model, newColor) {
    model.traverse((node) => {
        if (node.isMesh) {
        // Create a new material with the desired color
        const material = new THREE.MeshStandardMaterial({ color: newColor });

        // Assign the new material to the mesh
        node.material = material;
        }
    });
    }

function onWindowResize() {
    var width = window.innerWidth - 17;
    camera.aspect = width/height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
}

window.addEventListener('resize', onWindowResize);


onWindowResize();
function animate() {
    requestAnimationFrame(animate);
    obj.rotation.y += 0.02;
    renderer.render(scene, camera);
}