import {
  MeshStandardMaterial,
  ShaderMaterial,
  DoubleSide,
  TextureLoader,
  Vector4,
  Vector2,
} from 'three';
import fragmentShader from '../../shaders/fragmentRay.glsl';
import vertexShader from '../../shaders/vertexRay.glsl';

function createMaterials() {
  const body = new MeshStandardMaterial({
    color: 'firebrick',
    flatShading: true,
  });

  const shader = new ShaderMaterial({
    vertexShader,
    fragmentShader,
    extensions: {
      derivatives: "#extension GL_OES_standard_derivatives : enable"
    },
    uniforms: {
      time: { type: "f", value: 0.0 },
      sinValue: { type: "f", value: 1.0 },
      sinMultiplier: { type: "f", value: 3.0 },
      rotationSpeed: { type: "f", value: 0.005 },
      uZoom: {type: "f", value: 2.0 },
      uZoomSpeed: {type: "f", value: 40.0 },
      uScale: { type: "f", value: 13.0 },
      uZoomOn: { type: "f", value: 1.0 },
      uScaleOn: { type: "f", value: 0.75 },
      resolution: { type: "v4", value: new Vector4() },
      mouse: { type: "v2", value: new Vector2() }
    },
    // wireframe: true,
    side: DoubleSide
  });

  return { body, shader };
}

export { createMaterials };