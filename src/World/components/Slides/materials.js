import { ShaderMaterial, DoubleSide, TextureLoader, Vector2 } from 'three';
import fragmentShader from '../../shaders/fragmentWave.glsl';
import vertexShader from '../../shaders/vertexWave.glsl';


function createMaterials(image) {
  return new ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uTime: { value: 0.0 },
      uTexture: { value: new TextureLoader().load("https://source.unsplash.com/71SHXwBLp5w/1920x1080") },
      uResolution: { value: new Vector2() },
      uProgress: { value: 0.0 }
    },
    wireframe: true,
    side: DoubleSide
  });
}

export { createMaterials };