import { CreateVertexSet } from '../gameobjects3d/geometry/CreateVertexSet';
import { PlaneGeometry } from './PlaneGeometry';
import { VertexSet } from '../gameobjects3d/geometry/VertexSet';

export function BoxGeometry (x: number = 0, y: number = 0, z: number = 0, width: number = 1, height: number = 1, depth: number = 1, widthSegments: number = 1, heightSegments: number = 1, depthSegments: number = 1): VertexSet
{
    const data = CreateVertexSet();

    PlaneGeometry(data, x, y, z, 2, 1, 0, -1, -1, depth, height, width, depthSegments, heightSegments); // left
    PlaneGeometry(data, x, y, z, 2, 1, 0, 1, -1, depth, height, -width, depthSegments, heightSegments); // right
    PlaneGeometry(data, x, y, z, 0, 2, 1, 1, 1, width, depth, height, widthSegments, depthSegments); // top
    PlaneGeometry(data, x, y, z, 0, 2, 1, 1, -1, width, depth, -height, widthSegments, depthSegments); // bottom
    PlaneGeometry(data, x, y, z, 0, 1, 2, 1, -1, width, height, depth, widthSegments, heightSegments); // front
    PlaneGeometry(data, x, y, z, 0, 1, 2, -1, -1, width, height, -depth, widthSegments, heightSegments); // rear

    return data;
}
