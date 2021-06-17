import * as dat from 'dat.gui';
import { createCamera } from './components/camera.js';
import {
  createAxesHelper,
  createGridHelper,
} from './components/helpers.js';
import { createLights } from './components/lights.js';
import { createScene } from './components/scene.js';
import { createControls } from './systems/controls.js';
import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { Loop } from './systems/Loop.js';
import { Ray } from './components/Ray/Ray';
import { Plane } from './components/Plane/Plane';
import { createMeshes } from './components/Plane/meshes';

class World {
  #camera;
  #scene;
  #renderer;
  #loop;
  #controls;
  settings;
  gui;
  ray;
  container;
  counter;
  resizer;
  planeContainer;

  constructor(container) {
    this.container = container;
    this.gui = new dat.GUI();
    this.#camera = createCamera();
    this.#scene = createScene();
    this.#renderer = createRenderer();
    const { ambientLight, mainLight } = createLights();
    this.#loop = new Loop(this.#camera, this.#scene, this.#renderer, this.container);
    container.append(this.#renderer.domElement);

    // this.#controls = createControls(this.#camera, this.#renderer.domElement);
    // this.#loop.updatables.push(this.#controls);

    this.#scene.add(ambientLight, mainLight);

    // this.#scene.add(createAxesHelper(), createGridHelper());
  }

  async init() {
    this.ray = new Ray(this.container, this.#camera, this.gui);
    this.#scene.add(this.ray.mesh);
    this.#loop.updatables.push(this.ray);

    this.resizer = new Resizer(this.container, this.#camera, this.#renderer);
  }

  async initPlane(planeElement) {
    // this.planeContainer = planeElement;
    console.log(planeElement)
    this.plane = new Plane(planeElement, this.#renderer);
    this.#loop.updatables.push(this.plane);
  }

  rayZoomIn() {
    console.log('zoom');
    this.ray.onZoom();
  }

  rayZoomOut() {
    this.ray.onZoomOut();
  }

  // 2. Render the scene
  render() {
    // draw a single frame
    this.#renderer.render();
  }

  start() {
    this.#loop.start();
  }

  stop() {
    this.#loop.stop();
  }
}

export default World;