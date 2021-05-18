import { GetVertices } from './GetVertices';
import { Matrix2D } from '../../math/mat2d/Matrix2D';
import { Rectangle } from '../../geom/rectangle/Rectangle';
import { Vertex } from '../Vertex';

export function UpdateVertices (vertices: Vertex[], worldTransform: Matrix2D, transformExtent: Rectangle): void
{
    const { x0, y0, x1, y1, x2, y2, x3, y3 } = GetVertices(worldTransform, transformExtent);

    vertices[0].setPosition(x0, y0);
    vertices[1].setPosition(x1, y1);
    vertices[2].setPosition(x2, y2);
    vertices[3].setPosition(x3, y3);
}
