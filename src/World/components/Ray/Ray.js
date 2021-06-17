import {createMaterials} from "./materials";
import {createGeometries} from "./geometries";
import { Mesh, Vector2 } from "three";
import { animate } from "popmotion";

class Ray {
  time;
  isPlaying;
  material;
  geometry;
  mesh;
  container;
  camera;
  gui;
  settings;

  constructor(container, camera, gui) {
    this.settings = {
      sinValue: 1.0,
      sinMultiplier: 3.0,
      rotationSpeed: 0.005,
      uScale: 13.0,
      uZoom: 2.0,
      uZoomSpeed: 40.0,
      down: this.onDown.bind(this),
      zoom: this.onZoom.bind(this),
    }
    this.gui = gui;
    this.camera = camera;
    this.container = container;
    this.time = 0;
    this.isPlaying = true;

    const { shader } = createMaterials();
    this.material = shader;

    const { plane } = createGeometries();
    this.geometry = plane;

    this.mesh = new Mesh(this.geometry, this.material);

    this.gui.add(this.settings, "sinValue", 0.0, 2.0, 0.01);
    this.gui.add(this.settings, "sinMultiplier", 0.0, 10.0, 0.01);
    this.gui.add(this.settings, "rotationSpeed", 0.0, 10.0, 0.001);
    this.gui.add(this.settings, "uScale", 0.0, 100.0, 0.5);
    this.gui.add(this.settings, "uZoom", 0.0, 5.0, 0.01);
    this.gui.add(this.settings, 'down');
    this.gui.add(this.settings, 'zoom');

    this.gui.hide();

    this.mouseEvent();
    this.resize();
    this.setupResize();
  }

  onZoom() {
    console.log('zoom triggered');
    animate({
      from: 0.75,
      to: 0.05,
      duration: 1000,
      onUpdate: ((v) => {
        this.material.uniforms.uScaleOn.value = v;
      })
    })
    animate({
      from: 2.0,
      to: 0.8,
      duration: 1000,
      onUpdate: ((v) => {
        this.material.uniforms.uZoom.value = v;
      })
    })
    // this.material.uniforms.mouse.value = this.mouse;
  }

  onZoomOut() {
    animate({
      from: 0.05,
      to: 0.75,
      duration: 1000,
      onUpdate: ((v) => {
        this.material.uniforms.uScaleOn.value = v;
      })
    })
    animate({
      from: 0.8,
      to: 2.0,
      duration: 1000,
      onUpdate: ((v) => {
        this.material.uniforms.uZoom.value = v;
      })
    })
    // this.material.uniforms.mouse.value = this.mouse;
  }

  onDown() {
    animate({
      from: this.mouse.y,
      to: this.mouse.y += -10,
      onUpdate: ((v) => {
        this.mouse.y = v;
        this.material.uniforms.mouse.value = this.mouse;
      })
    })
    // this.material.uniforms.mouse.value = this.mouse;
  }

  ///////////////////////////////
  // mouse event
  mouseEvent() {
    this.mouse = new Vector2();

    let that = this;
    function onMouseMove(event) {
      // calculate mouse position in normalized device coordinates
      // (-1 to +1) for both components

      that.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      that.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      that.material.uniforms.mouse.value = that.mouse;
    }

    window.addEventListener("mousemove", onMouseMove, false);
  }
  // end of mouse event
  ///////////////////////////////

  ///////////////////////////////
  // resize
  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    // image cover
    this.imageAspect = 1 / 1;
    // this.imageAspect = 3840 / 2160;
    let a1, a2;
    if (this.height / this.width > this.imageAspect) {
      a1 = (this.width / this.height) * this.imageAspect;
      a2 = 1;
    } else {
      a1 = 1;
      a2 = this.height / this.width / this.imageAspect;
    }

    this.material.uniforms.resolution.value.x = this.width;
    this.material.uniforms.resolution.value.y = this.height;
    this.material.uniforms.resolution.value.z = a1;
    this.material.uniforms.resolution.value.w = a2;

    // full screen
    const height = 1;
    this.camera.fov =
      ((2 * 180) / Math.PI) * Math.atan(height / 2 / this.camera.position.z);

    if (this.width / this.height > 1) {
      this.mesh.scale.x = this.camera.aspect;
    } else {
      this.mesh.scale.y = 1 / this.camera.aspect;
    }
  }

  getBounds() {
    return this.container.getBoundingClientRect();
  }

  setupResize() {
    window.addEventListener("resize", this.resize.bind(this));
  }

  stop() {
    this.isPlaying = false;
  }

  play() {
    if (!this.isPlaying) {
      this.isPlaying = true;
    }
  }

  tick() {
    if (!this.isPlaying) return;
    this.time += 0.05;
    this.material.uniforms.sinValue.value = this.settings.sinValue;
    this.material.uniforms.sinMultiplier.value = this.settings.sinMultiplier;
    this.material.uniforms.rotationSpeed.value = this.settings.rotationSpeed;
    this.material.uniforms.uScale.value = this.settings.uScale;
    this.material.uniforms.time.value = this.time;
  }
}

export { Ray };