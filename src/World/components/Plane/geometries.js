import { PlaneBufferGeometry } from 'three';

function createGeometries(variation) {
  let width = 3;
  let height = 2;

  if (variation === 'slide') {
    width = 4;
    height = 3;
  }

  const plane = new PlaneBufferGeometry(width, height, 16, 16);

  return {
    plane,
  };
}

export { createGeometries }