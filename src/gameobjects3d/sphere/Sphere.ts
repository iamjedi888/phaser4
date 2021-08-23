import { Geometry } from '../geometry/Geometry';
import { Mesh } from '../mesh/Mesh';
import { SphereGeometry } from '../../geom3d/SphereGeometry';

export class Sphere extends Mesh
{
    constructor (x: number = 0, y: number = 0, z: number = 0, radius = 1, widthSegments = 3, heightSegments = 3, phiStart = 0, phiLength = Math.PI * 2, thetaStart = 0, thetaLength = Math.PI)
    {
        const data = SphereGeometry(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength);

        const geometry = new Geometry(data);

        super(x, y, z, geometry);
    }
}
