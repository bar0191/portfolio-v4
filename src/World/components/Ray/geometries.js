import { PlaneBufferGeometry } from 'three';

function createGeometries() {
  const plane = new PlaneBufferGeometry(1, 1, 1, 1);

  return { plane };
}

export { createGeometries }