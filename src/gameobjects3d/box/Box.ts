import { BoxGeometry } from '../../geom3d/BoxGeometry';
import { Geometry } from '../geometry/Geometry';
import { Mesh } from '../mesh/Mesh';

export class Box extends Mesh
{
    constructor (x: number = 0, y: number = 0, z: number = 0, width: number = 1, height: number = 1, depth: number = 1, widthSegments: number = 1, heightSegments: number = 1, depthSegments: number = 1)
    {
        const data = BoxGeometry(0, 0, 0, width, height, depth, widthSegments, heightSegments, depthSegments);

        const geometry = new Geometry(data);

        super(x, y, z, geometry);
    }
}
