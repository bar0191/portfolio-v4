import { WebGLRenderer } from 'three';

function createRenderer() {
  const renderer = new WebGLRenderer({ antialias: true, alpha: true });

  // turn on the physically correct lighting model
  renderer.physicallyCorrectLights = true;

  renderer.setPixelRatio(1.5)

  renderer.setClearColor( 0xffffff, 1 ); // the default

  return renderer;
}

export { createRenderer };