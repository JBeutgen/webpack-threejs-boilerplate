import * as three from 'three';

// eslint-disable-next-line
import 'exports-loader?three.ColladaLoader=THREE.ColladaLoader!imports-loader?THREE=three!three/examples/js/loaders/ColladaLoader';

// eslint-disable-next-line
import 'exports-loader?three.OrbitControls=THREE.OrbitControls!imports-loader?THREE=three!three/examples/js/controls/OrbitControls';

// use shaders like this (material see below)
// import shaderVert from 'shaders/custom.vert'
// import shaderFrag from 'shaders/custom.frag'

const THREE = three;

class Main {
  constructor () {
    this._camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000)
    this._camera.position.z = 400

    this._scene = new THREE.Scene()

    // shader material
    /*
    const material2 = new THREE.ShaderMaterial({
      vertexShader: shaderVert,
      fragmentShader: shaderFrag
    })
    */
   
    this._renderer = new THREE.WebGLRenderer()
    this._renderer.setPixelRatio(window.devicePixelRatio)
    this._renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(this._renderer.domElement)

    this._controls = new THREE.OrbitControls(this._camera, this._renderer.domElement)
    // this._controls.addEventListener( 'change', render ) // add this only if there is no animation loop (requestAnimationFrame)
    this._controls.enableDamping = true
    this._controls.dampingFactor = 0.25
    this._controls.enableZoom = false

    window.addEventListener('resize', this.onWindowResize.bind(this), false)

    const geometry = new THREE.BoxGeometry(200, 200, 200);

    const mat1 = new THREE.MeshBasicMaterial({
      color: 0x0000ff
    });

    this._mesh = new THREE.Mesh(geometry, mat1);
    this._scene.add(this._mesh);

    this.animate();
  }

  get renderer () {
    return this._renderer;
  }

  get camera () {
    return this._camera;
  }

  get scene () {
    return this._scene;
  }

  onWindowResize () {
    this._camera.aspect = window.innerWidth / window.innerHeight;
    this._camera.updateProjectionMatrix();

    this._renderer.setSize(window.innerWidth, window.innerHeight);
  }

  animate (timestamp) {
    requestAnimationFrame(this.animate.bind(this));
    this._renderer.render(this._scene, this._camera);
  }
}

export default Main
