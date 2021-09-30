import { ShaderAttributeEntry } from './CreateAttributes';

export const DefaultQuadAttributes: Record<string, ShaderAttributeEntry> =
{
    aVertexPosition: { size: 2 },
    aTextureCoord: { size: 2 },
    aTextureId: { size: 1 },
    aTintColor: { size: 4 }
};
