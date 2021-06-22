import { PerspectiveCamera, Scene, Mesh, DirectionalLight, HemisphereLight } from 'three';
import { createMaterials } from './materials';
import { createControls } from '../../systems/controls';

class Slide {
  container;
  src;
  camera;
  scene;
  geometry;
  material;
  mesh;
  light;
  renderer;

  constructor(container, geometry, renderer) {
    this.container = container;
    console.log(this.container.getBoundingClientRect())
    this.src = container.src;
    this.geometry = geometry;
    this.renderer = renderer;
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(45, 2, 0.1, 100);
    this.material = createMaterials(this.src);
    this.mesh = new Mesh(this.geometry, this.material);
    // this.light = new DirectionalLight('white', 4);
    // this.getBounds = this.getBounds.bind(this);

    const directional = new DirectionalLight('white', 4);

    const ambientLight = new HemisphereLight(
      0xaaaaaa, 0x444444
    );

    this.controls = createControls(this.camera, this.container);
    directional.position.set(0, 0, -5);
    this.camera.position.set(0, 0, 2);
    this.mesh.position.set(0, 0, 0.2);
    this.camera.lookAt(this.mesh);
    this.scene.add(directional, ambientLight, this.mesh);
  }

  getBounds() {
    return this.container.getBoundingClientRect();
  }

  tick(delta, time) {
    this.mesh.material.uniforms.uTime.value = time;
    const rect = this.getBounds();
    this.camera.aspect = rect.width / rect.height;
    this.camera.updateProjectionMatrix();
    // this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  resize() {}
}

export default Slide;