import { WebGLRenderer } from 'three';

function createRenderer() {
  const renderer = new WebGLRenderer({ antialias: true, alpha: true });

  renderer.setPixelRatio(1);

  renderer.setClearColor(0xffffff, 1); // the default

  return renderer;
}

export { createRenderer };