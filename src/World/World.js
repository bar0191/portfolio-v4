import * as dat from 'dat.gui';
import { createCamera } from './components/camera.js';
import { createScene } from './components/scene.js';
import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { Loop } from './systems/Loop.js';
import { Ray } from './components/Ray/Ray';
import { Plane } from './components/Plane/Plane';

class World {
  camera;
  scene;
  renderer;
  loop;
  settings;
  gui;
  ray;
  container;
  counter;
  resizer;

  constructor(container) {
    this.container = container;
    this.gui = new dat.GUI();
    this.camera = createCamera();
    this.scene = createScene();
    this.renderer = createRenderer();
    this.loop = new Loop(this.camera, this.scene, this.renderer, this.container);
    container.append(this.renderer.domElement);
  }

  async init() {
    this.ray = new Ray(this.container, this.camera, this.gui);
    this.scene.add(this.ray.mesh);
    this.loop.updatables.push(this.ray);

    this.resizer = new Resizer(this.container, this.camera, this.renderer, this.loop.updatables);
  }

  async initPlane(planeElement) {
    this.plane = new Plane(planeElement, this.renderer, 'plane');
    this.loop.updatables.push(this.plane);
  }

  async initSlides(elements) {
    this.planes = [];
    elements.forEach((el) => {
      this.planes.push(
        new Plane(el, this.renderer, 'slide')
      );
    })
    this.loop.updatables.push(...this.planes);
  }

  rayZoomIn() {
    this.ray.onZoom();
  }

  rayZoomOut() {
    this.ray.onZoomOut();
  }

  render() {
    this.renderer.render();
  }

  start() {
    this.loop.start();
  }

  stop() {
    this.loop.stop();
  }
}

export default World;