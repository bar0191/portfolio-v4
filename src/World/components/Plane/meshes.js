import { Mesh } from 'three';

import { createGeometries } from './geometries.js';
import { createMaterials } from './materials.js';

function createMeshes(el, variation) {
  const geometries = createGeometries(variation);
  const materials = createMaterials(el);

  const plane = new Mesh(geometries.plane, materials.shader);

  return {
    plane,
  };
}

export { createMeshes }