import { BatchTriangle } from './BatchTriangle';
import { Circle } from '../../../geom/circle/Circle';
import { GetCirclePointsBetween } from '../../../geom/circle/GetCirclePointsBetween';
import { GetVertexBufferEntry } from '../renderpass/GetVertexBufferEntry';
import { IRenderPass } from '../renderpass/IRenderPass';
import { Triangulate } from '../../../geom/PolyPartition';

let circle: Circle;

export function FillArc (renderPass: IRenderPass, x: number, y: number, radius: number, startAngle: number, endAngle: number, steps: number, anticlockwise: boolean, includeCenter: boolean, red: number, green: number, blue: number, alpha: number): void
{
    if (!circle)
    {
        circle = new Circle();
    }

    circle.set(x, y, radius);

    const points = GetCirclePointsBetween(circle, startAngle, endAngle, steps, anticlockwise, includeCenter);

    const tris = Triangulate(points);

    if (!tris.length)
    {
        return;
    }

    const { F32, offset } = GetVertexBufferEntry(renderPass, tris.length);

    const textureIndex = renderPass.textures.setWhite();

    let idx = offset;

    tris.forEach(tri =>
    {
        idx = BatchTriangle(
            F32, idx, textureIndex,
            tri[0].x, tri[0].y,
            tri[1].x, tri[1].y,
            tri[2].x, tri[2].y,
            red, green, blue, alpha
        );
    });
}
