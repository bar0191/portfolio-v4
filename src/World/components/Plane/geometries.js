import { PlaneBufferGeometry } from 'three';

function createGeometries() {

  const plane = new PlaneBufferGeometry(3, 2, 16, 16);

  return {
    plane,
  };
}

export { createGeometries }