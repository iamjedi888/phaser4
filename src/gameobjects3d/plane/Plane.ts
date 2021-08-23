import { Geometry } from '../geometry/Geometry';
import { Mesh } from '../mesh/Mesh';
import { PlaneGeometry } from '../../geom3d/PlaneGeometry';

export class Plane extends Mesh
{
    constructor (x: number = 0, y: number = 0, z: number = 0, width: number = 1, height: number = 1, widthSegments: number = 1, heightSegments: number = 1)
    {
        const data = PlaneGeometry(null, 0, 0, 0, 0, 1, 2, 1, -1, width, height, 1, widthSegments, heightSegments);

        const geometry = new Geometry(data);

        super(x, y, z, geometry);
    }
}
