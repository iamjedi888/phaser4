import * as GL_CONST from "../GL_CONST";
import {AMBIENT_LIGHT_FRAG} from "../glsl/AMBIENT_LIGHT_FRAG";
import {AMBIENT_LIGHT_VERT} from "../glsl/AMBIENT_LIGHT_VERT";
import {Shader} from "./Shader";
export class GoraudLambertShader extends Shader {
  constructor() {
    super();
    const config = {
      fragmentShader: AMBIENT_LIGHT_FRAG,
      vertexShader: AMBIENT_LIGHT_VERT,
      attributes: {
        aVertexPosition: {size: 3, type: GL_CONST.FLOAT, normalized: false, offset: 0},
        aVertexNormal: {size: 3, type: GL_CONST.FLOAT, normalized: false, offset: 12},
        aTextureCoord: {size: 2, type: GL_CONST.FLOAT, normalized: false, offset: 24}
      },
      uniforms: {
        uViewProjectionMatrix: new Float32Array(16),
        uNormalMatrix: new Float32Array(16),
        uModelMatrix: new Float32Array(16).fill(0),
        uTexture: 0,
        uLightColor: [1, 1, 1],
        uLightDirection: [0.5, 3, 4],
        uLightAmbient: [0.2, 0.2, 0.2]
      }
    };
    this.fromConfig(config);
  }
}
