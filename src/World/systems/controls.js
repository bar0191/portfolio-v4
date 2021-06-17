import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

function createControls(camera, canvas) {
  const controls = new OrbitControls(camera, canvas);

  // provides a feeling of weight when panning
  controls.enableDamping = true;

  controls.tick = () => controls.update();

  return controls;
}

export { createControls };