import * as GL_CONST from '../GL_CONST';

import { ShaderAttributeEntry } from './CreateAttributes';

export const DefaultQuadAttributes: Record<string, ShaderAttributeEntry> =
{
    aVertexPosition: { size: 2 },
    aTextureCoord: { size: 2 },
    aTextureId: { size: 1 },
    aTintColor: { size: 4, type: GL_CONST.UNSIGNED_BYTE, normalized: true }
};
