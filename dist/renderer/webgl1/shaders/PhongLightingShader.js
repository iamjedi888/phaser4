import * as GL_CONST from "../GL_CONST";
import { PHONG_TEXTURE_FRAG } from "../glsl/PHONG_TEXTURE_FRAG";
import { PHONG_TEXTURE_VERT } from "../glsl/PHONG_TEXTURE_VERT";
import { Shader } from "./Shader";
export class PhongLightingShader extends Shader {
  constructor() {
    super();
    const config = {
      fragmentShader: PHONG_TEXTURE_FRAG,
      vertexShader: PHONG_TEXTURE_VERT,
      attributes: {
        aVertexPosition: { size: 3, type: GL_CONST.FLOAT, normalized: false, offset: 0 },
        aVertexNormal: { size: 3, type: GL_CONST.FLOAT, normalized: false, offset: 12 },
        aTextureCoord: { size: 2, type: GL_CONST.FLOAT, normalized: false, offset: 24 },
        aTextureId: { size: 1, type: GL_CONST.FLOAT, normalized: false, offset: 32 }
      },
      uniforms: {
        uProjectionMatrix: new Float32Array(),
        uCameraMatrix: new Float32Array(),
        uNormalMatrix: new Float32Array(),
        uTexture: 0,
        uShininess: 10.1,
        uLightDirection: [0, -1, 1],
        uLightAmbient: [0.75, 0.75, 0.75, 1],
        uLightDiffuse: [0.5, 0.5, 0.5, 1],
        uLightSpecular: [0.4, 0.4, 0.4, 1],
        uMaterialAmbient: [0.2, 0.2, 0.2, 1],
        uMaterialDiffuse: [0.2, 0.2, 0.2, 1],
        uMaterialSpecular: [0.91, 0.91, 0.91, 1]
      }
    };
    this.fromConfig(config);
  }
}
