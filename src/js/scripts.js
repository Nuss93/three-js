import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui'

const renderer = new THREE.WebGLRenderer()

renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement)

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000)

const orbit = new OrbitControls(camera, renderer.domElement)

const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

// camera.position.z = 5
camera.position.set(-10,30,30)
orbit.update()

const ambientLight = new THREE.AmbientLight(0x333333)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6)
scene.add(directionalLight)
directionalLight.position.set(-30,30,0)
const dLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5)
scene.add(dLightHelper)

const boxGeometry = new THREE.BoxGeometry( 1, 1, 1 );
const boxMaterial = new THREE.MeshStandardMaterial( { color: '#242424' } );
const box = new THREE.Mesh( boxGeometry, boxMaterial );
scene.add(box);

const planeGeometry = new THREE.PlaneGeometry( 30, 30 );
const planeMaterial = new THREE.MeshStandardMaterial({
    color: '#DFDFDF',
    side: THREE.DoubleSide
});
const plane = new THREE.Mesh( planeGeometry, planeMaterial );
scene.add( plane );
plane.rotation.x = -0.5 * Math.PI

const sphereGeometry = new THREE.SphereGeometry( 4 ); 
const sphereMaterial = new THREE.MeshStandardMaterial({
    color: 0xffff00,
    wireframe: false
}); 
const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
scene.add( sphere );
sphere.position.x = -10

const gridHelper = new THREE.GridHelper(30)
scene.add(gridHelper)

const gui = new dat.GUI()
const options = {
    sphereColor: '#ffff00',
    wireframe: false,
    speed: 0.01
}
gui.addColor(options, 'sphereColor').onChange((e) => {
    sphere.material.color.set(e)
})
gui.add(options, 'wireframe').onChange((e) => {
    sphere.material.wireframe = e;
})
gui.add(options, 'speed', 0.01, 0.1)

let step = 0

function animate(time) {
    box.rotation.x = time / 1000
    box.rotation.y = time / 1000
    
    step += options.speed
    sphere.position.y = 10 * Math.abs(Math.sin(step))
    
    renderer.render(scene, camera)
}


renderer.setAnimationLoop(animate)