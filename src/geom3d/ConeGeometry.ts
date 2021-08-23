import { CylinderGeometry } from './CylinderGeometry';
import { VertexSet } from '../gameobjects3d/geometry/VertexSet';

export function ConeGeometry (radius: number = 1, height: number = 1, radialSegments: number = 8, heightSegments: number = 1, openEnded: boolean = false, thetaStart: number = 0, thetaLength: number = Math.PI * 2): VertexSet
{
    return CylinderGeometry(0, radius, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength);
}
