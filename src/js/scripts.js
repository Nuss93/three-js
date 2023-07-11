import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui'

const renderer = new THREE.WebGLRenderer()

renderer.shadowMap.enabled = true

renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement)

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000)

const orbit = new OrbitControls(camera, renderer.domElement)

const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

camera.position.set(-10,30,30)
orbit.update()

const ambientLight = new THREE.AmbientLight(0x333333)
scene.add(ambientLight)

// ======= DIRECTIONAL LIGHT =======
// const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6)
// scene.add(directionalLight)
// directionalLight.position.set(-30,30,0)
// const dLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5)
// scene.add(dLightHelper)
// directionalLight.castShadow = true;
// directionalLight.shadow.camera.bottom = -12

// const dLightShadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
// scene.add(dLightShadowHelper)

// ======= SPOT LIGHT =======
const spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set( -100, 100, 0 );
spotLight.angle = 0.2;
// spotLight.map = new THREE.TextureLoader().load( url );
scene.add(spotLight)
spotLight.castShadow = true;

const sLightHelper = new THREE.SpotLightHelper(spotLight)
scene.add(sLightHelper)

const boxGeometry = new THREE.BoxGeometry( 1, 1, 1 );
const boxMaterial = new THREE.MeshStandardMaterial( { color: 0x6BAF7A } );
const box = new THREE.Mesh( boxGeometry, boxMaterial );
scene.add(box);

const planeGeometry = new THREE.PlaneGeometry( 30, 30 );
const planeMaterial = new THREE.MeshStandardMaterial({
    color: '#DFDFDF',
    side: THREE.DoubleSide
});
const plane = new THREE.Mesh( planeGeometry, planeMaterial );
scene.add( plane );
plane.rotation.x = -0.5 * Math.PI;
plane.receiveShadow = true;

const sphereGeometry = new THREE.SphereGeometry( 4 ); 
const sphereMaterial = new THREE.MeshStandardMaterial({
    color: 0xffff00,
    wireframe: false
}); 
const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
scene.add( sphere );
sphere.position.x = -10
sphere.castShadow = true;

const gridHelper = new THREE.GridHelper(30)
scene.add(gridHelper)

const gui = new dat.GUI()
const options = {
    sphereColor: '#ffff00',
    wireframe: false,
    speed: 0.01,
    boxPosition: 0,
    angle: 0.2,
    penumbra: 0,
    intensity: 1,
}
gui.addColor(options, 'sphereColor').onChange((e) => {
    sphere.material.color.set(e)
})
gui.add(options, 'wireframe').onChange((e) => {
    sphere.material.wireframe = e;
})
gui.add(options, 'speed', 0.01, 0.1)
gui.add(options, 'boxPosition', 0, 10).onChange((e) => {
    box.position.y = options.boxPosition
})

gui.add(options, 'angle', 0, 1)
gui.add(options, 'penumbra', 0, 1)
gui.add(options, 'intensity', 0, 1)

let step = 0

function animate(time) {
    box.rotation.x = time / 1000
    box.rotation.y = time / 1000
    
    step += options.speed
    sphere.position.y = 10 * Math.abs(Math.sin(step))

    spotLight.angle = options.angle;
    spotLight.penumbra = options.penumbra;
    spotLight.intensity = options.intensity;
    sLightHelper.update();
    
    renderer.render(scene, camera)
}


renderer.setAnimationLoop(animate)