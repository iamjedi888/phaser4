import { ConeGeometry } from '../../geom3d/ConeGeometry';
import { Geometry } from '../geometry/Geometry';
import { Mesh } from '../mesh/Mesh';

export class Cone extends Mesh
{
    constructor (x: number = 0, y: number = 0, z: number = 0, radius: number = 1, height: number = 1, radialSegments: number = 8, heightSegments: number = 1, openEnded: boolean = false, thetaStart: number = 0, thetaLength: number = Math.PI * 2)
    {
        const data = ConeGeometry(radius, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength);

        const geometry = new Geometry(data);

        super(x, y, z, geometry);
    }
}
