import { ITransformComponent } from './ITransformComponent';
import { Vertices } from './Vertices';

export function GetVertices (transform: ITransformComponent): Vertices
{
    const { a, b, c, d, tx, ty } = transform.world;
    const { x, y, right, bottom } = transform.extent;

    const x0 = (x * a) + (y * c) + tx;
    const y0 = (x * b) + (y * d) + ty;

    const x1 = (x * a) + (bottom * c) + tx;
    const y1 = (x * b) + (bottom * d) + ty;

    const x2 = (right * a) + (bottom * c) + tx;
    const y2 = (right * b) + (bottom * d) + ty;

    const x3 = (right * a) + (y * c) + tx;
    const y3 = (right * b) + (y * d) + ty;

    return { x0, y0, x1, y1, x2, y2, x3, y3 };
}
