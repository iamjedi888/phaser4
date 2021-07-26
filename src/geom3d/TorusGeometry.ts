import { CreateVertexSet } from '../gameobjects3d/geometry/CreateVertexSet';
import { Vec3 } from '../math/vec3/Vec3';
import { Vec3Normalize } from '../math/vec3/Vec3Normalize';
import { Vec3Subtract } from '../math/vec3/Vec3Subtract';
import { VertexSet } from '../gameobjects3d/geometry/VertexSet';

export function TorusGeometry (radius: number = 1, tube: number = 0.4, radialSegments: number = 8, tubularSegments: number = 6, arc: number = Math.PI * 2): VertexSet
{
    const data = CreateVertexSet();

    const {
        vertices,
        normals,
        uvs,
        indices
    } = data;

    // helper variables

    const center = new Vec3();
    const vertex = new Vec3();
    const normal = new Vec3();

    // generate vertices, normals and uvs

    for (let j = 0; j <= radialSegments; j++)
    {
        for (let i = 0; i <= tubularSegments; i++)
        {
            const u = i / tubularSegments * arc;
            const v = j / radialSegments * Math.PI * 2;

            // vertex
            vertex.x = (radius + tube * Math.cos(v)) * Math.cos(u);
            vertex.y = (radius + tube * Math.cos(v)) * Math.sin(u);
            vertex.z = tube * Math.sin(v);

            vertices.push(vertex.x, vertex.y, vertex.z);

            // normal
            center.x = radius * Math.cos(u);
            center.y = radius * Math.sin(u);

            Vec3Subtract(vertex, center, normal);
            Vec3Normalize(normal, normal);

            normals.push(normal.x, normal.y, normal.z);

            // uv
            uvs.push(i / tubularSegments);
            uvs.push(j / radialSegments);
        }
    }

    // generate indices
    for (let j = 1; j <= radialSegments; j++)
    {
        for (let i = 1; i <= tubularSegments; i++)
        {
            // indices

            const a = (tubularSegments + 1) * j + i - 1;
            const b = (tubularSegments + 1) * (j - 1) + i - 1;
            const c = (tubularSegments + 1) * (j - 1) + i;
            const d = (tubularSegments + 1) * j + i;

            // faces
            indices.push(a, b, d);
            indices.push(b, c, d);
        }
    }

    data.numberOfVertices = vertices.length;

    return data;
}
