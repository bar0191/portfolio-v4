import { Clock } from 'three';

const clock = new Clock();

class Loop {
  container;
  camera;
  scene;
  renderer;
  updatables;

  constructor(camera, scene, renderer, container) {
    this.container = container;
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.updatables = [];
  }

  start() {
    this.renderer.setAnimationLoop(() => this.tick());
  }

  stop() {
    this.renderer.setAnimationLoop(null);
  }

  tick() {
    // only call the getDelta function once per frame!
    const delta = clock.getDelta();
    const time = clock.getElapsedTime();

    this.renderer.autoClear = false;
    this.renderer.setScissorTest(false);
    this.renderer.physicallyCorrectLights = true;
    this.renderer.setPixelRatio(1);
    this.renderer.setClearColor(0xffffff, 1); // the default
    this.renderer.clear(true, true);
    this.renderer.setScissorTest(true);

    const mainRect = this.container.getBoundingClientRect();
    const positiveY = this.renderer.domElement.clientHeight - mainRect.bottom;
    this.renderer.setScissor(mainRect.left, positiveY, mainRect.width, mainRect.height);
    this.renderer.setViewport(mainRect.left, positiveY, mainRect.width, mainRect.height);

    // render main scene
    this.renderer.render(this.scene, this.camera);

    this.renderer.clearDepth();

    this.updatables.forEach((obj) => {
      const rect = obj.getBounds();
      const { left, right, top, bottom, width, height } = rect;

      const isOffscreen =
        bottom < 0 ||
        top > this.renderer.domElement.clientHeight ||
        right < 0 ||
        left > this.renderer.domElement.clientWidth;

      if (!isOffscreen) {
        const positiveYUpBottom = this.renderer.domElement.clientHeight - bottom;
        this.renderer.setScissor(left, positiveYUpBottom, width, height);
        this.renderer.setViewport(left, positiveYUpBottom, width, height);

        this.renderer.clearDepth();

        obj.tick(delta, time);
      }
    })
  }
}

export { Loop }