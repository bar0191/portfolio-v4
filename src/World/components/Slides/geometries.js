import { PlaneBufferGeometry } from 'three';

function createGeometries() {
  return new PlaneBufferGeometry(
    3,
    2,
    16,
    16
  );
}

export { createGeometries }