import { PerspectiveCamera } from 'three';

function createCamera(width, height) {
  const aspect = window.innerWidth / window.innerHeight;

  const camera = new PerspectiveCamera(70, aspect, 0.1, 1000);

  camera.position.set(0, 0, 2);

  return camera;
}

export { createCamera };

