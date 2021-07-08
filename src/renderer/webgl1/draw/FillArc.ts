import { Circle, GetCirclePoints } from '../../../geom/circle';

import { GetTexture } from '../../../textures/GetTexture';
import { GetVertexBufferEntry } from '../renderpass/GetVertexBufferEntry';
import { IRenderPass } from '../renderpass/IRenderPass';
import { PackColor } from '../colors/PackColor';
import { Triangulate } from '../../../geom/PolyPartition';

export function FillArc (renderPass: IRenderPass, x: number, y: number, radius: number, startAngle: number, endAngle: number, anticlockwise: boolean, color: number, alpha: number = 1): void
{
    const packedColor = PackColor(color, alpha);

    const textureIndex = renderPass.textures.set(GetTexture('__WHITE'));

    const points = GetCirclePoints(new Circle(x, y, radius), 8);

    const tris = Triangulate(points);

    const { F32, U32, offset } = GetVertexBufferEntry(renderPass, tris.length);

    let idx = offset;

    tris.forEach(tri =>
    {
        //  top left
        F32[idx + 0] = tri[0].x;
        F32[idx + 1] = tri[0].y;
        F32[idx + 2] = 0;
        F32[idx + 3] = 0;
        F32[idx + 4] = textureIndex;
        U32[idx + 5] = packedColor;

        //  bottom left
        F32[idx + 6] = tri[1].x;
        F32[idx + 7] = tri[1].y;
        F32[idx + 8] = 0;
        F32[idx + 9] = 1;
        F32[idx + 10] = textureIndex;
        U32[idx + 11] = packedColor;

        //  bottom right
        F32[idx + 12] = tri[2].x;
        F32[idx + 13] = tri[2].y;
        F32[idx + 14] = 1;
        F32[idx + 15] = 1;
        F32[idx + 16] = textureIndex;
        U32[idx + 17] = packedColor;

        idx += 18;
    });
}
