import { MeshStandardMaterial, ShaderMaterial, DoubleSide, TextureLoader, Vector2 } from 'three';
import fragmentShader from '../../shaders/fragmentWave.glsl';
import vertexShader from '../../shaders/vertexWave.glsl';
// import image from './purple.jpg';

const sweetImages = ['71SHXwBLp5w', ]

function createMaterials(el) {
  const body = new MeshStandardMaterial({
    color: 'yellow',
    flatShading: true,
  });

  const shader = new ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uTime: { value: 0.0 },
      uTexture: { value: new TextureLoader().load(
        "https://source.unsplash.com/4pTY4ty7jXM/1920x1080"
        ) },
      uResolution: { value: new Vector2() },
      uProgress: { value: 0.0 }
    },
    // wireframe: true,
    side: DoubleSide
  });

  return { body, shader };
}

export { createMaterials };