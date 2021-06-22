import { AddVertexToBatch } from './AddVertexToBatch';
import { GetVertexBufferEntry } from '../renderpass/GetVertexBufferEntry';
import { IRenderPass } from '../renderpass/IRenderPass';
import { ITexture } from '../../../textures/ITexture';
import { QuadVertexComponent } from '../../../components/vertices/QuadVertexComponent';

export function BatchTexturedQuad <T extends ITexture> (texture: T, id: number, renderPass: IRenderPass): void
{
    const { F32, U32, offset } = GetVertexBufferEntry(renderPass, 1);

    const textureIndex = renderPass.textures.set(texture);

    let vertOffset = AddVertexToBatch(QuadVertexComponent.v1[id], offset, textureIndex, F32, U32);
    vertOffset = AddVertexToBatch(QuadVertexComponent.v2[id], vertOffset, textureIndex, F32, U32);
    vertOffset = AddVertexToBatch(QuadVertexComponent.v3[id], vertOffset, textureIndex, F32, U32);
    AddVertexToBatch(QuadVertexComponent.v4[id], vertOffset, textureIndex, F32, U32);
}

/*
    vertexData array structure:

    0 = topLeft.x
    1 = topLeft.y
    2 = frame.u0
    3 = frame.v0
    4 = textureIndex
    5 = topLeft.packedColor

    6 = bottomLeft.x
    7 = bottomLeft.y
    8 = frame.u0
    9 = frame.v1
    10 = textureIndex
    11 = bottomLeft.packedColor

    12 = bottomRight.x
    13 = bottomRight.y
    14 = frame.u1
    15 = frame.v1
    16 = textureIndex
    17 = bottomRight.packedColor

    18 = topRight.x
    19 = topRight.y
    20 = frame.u1
    21 = frame.v0
    22 = textureIndex
    23 = topRight.packedColor
*/
