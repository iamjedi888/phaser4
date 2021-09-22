import * as GL_CONST from "../GL_CONST";
import { AMBIENT_LIGHT_FRAG } from "../glsl/AMBIENT_LIGHT_FRAG";
import { AMBIENT_LIGHT_VERT } from "../glsl/AMBIENT_LIGHT_VERT";
import { Shader } from "./Shader";
export class AmbientLightShader extends Shader {
  constructor() {
    const tempMat4 = new Float32Array(16).fill(0);
    const tempVec3 = [0, 0, 0];
    const config = {
      fragmentShader: AMBIENT_LIGHT_FRAG,
      vertexShader: AMBIENT_LIGHT_VERT,
      attributes: {
        aVertexPosition: { size: 3, type: GL_CONST.FLOAT, normalized: false, offset: 0 },
        aVertexNormal: { size: 3, type: GL_CONST.FLOAT, normalized: false, offset: 12 },
        aTextureCoord: { size: 2, type: GL_CONST.FLOAT, normalized: false, offset: 24 }
      },
      uniforms: {
        uViewProjectionMatrix: tempMat4,
        uNormalMatrix: tempMat4,
        uModelMatrix: tempMat4,
        uCameraPosition: tempVec3,
        uTexture: 0,
        uLightPosition: tempVec3,
        uLightAmbient: tempVec3,
        uLightDiffuse: tempVec3,
        uLightSpecular: tempVec3,
        uMaterialAmbient: tempVec3,
        uMaterialDiffuse: tempVec3,
        uMaterialSpecular: tempVec3,
        uMaterialShine: 0
      }
    };
    super(config);
  }
}
