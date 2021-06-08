import * as GL_CONST from "../GL_CONST";
export const DefaultQuadAttributes = {
  aVertexPosition: { size: 2, type: GL_CONST.FLOAT, normalized: false, offset: 0 },
  aTextureCoord: { size: 2, type: GL_CONST.FLOAT, normalized: false, offset: 8 },
  aTextureId: { size: 1, type: GL_CONST.FLOAT, normalized: false, offset: 16 },
  aTintColor: { size: 4, type: GL_CONST.UNSIGNED_BYTE, normalized: true, offset: 20 }
};
