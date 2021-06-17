import { DirectionalLight, HemisphereLight } from 'three';

function createLights() {
  const ambientLight = new HemisphereLight(
    0xaaaaaa, 0x444444
  );

  const mainLight = new DirectionalLight('white', 4);
  mainLight.position.set(0, 10, -10);

  const baseLight = new DirectionalLight('white', 2);
  baseLight.position.set(0, -10, 0);

  return { ambientLight, mainLight, baseLight };
}

export { createLights };