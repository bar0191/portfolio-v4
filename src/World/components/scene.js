import { Color, Scene } from 'three';

function createScene() {
  const scene = new Scene();

  const color = new Color('#848884');

  scene.background = null;

  return scene;
}

export { createScene };