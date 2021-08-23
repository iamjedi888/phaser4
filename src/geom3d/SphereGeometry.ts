import { CreateVertexSet } from '../gameobjects3d/geometry/CreateVertexSet';
import { Vec3 } from '../math/vec3/Vec3';
import { Vec3Normalize } from '../math/vec3/Vec3Normalize';
import { VertexSet } from '../gameobjects3d/geometry/VertexSet';

export function SphereGeometry (radius = 1, widthSegments = 3, heightSegments = 3, phiStart = 0, phiLength = Math.PI * 2, thetaStart = 0, thetaLength = Math.PI): VertexSet
{
    widthSegments = Math.max(3, Math.floor(widthSegments) || 8);
    heightSegments = Math.max(2, Math.floor(heightSegments) || 6);

    const thetaEnd = Math.min(thetaStart + thetaLength, Math.PI);

    const data = CreateVertexSet();

    // buffers
    const {
        vertices,
        normals,
        uvs,
        indices
    } = data;

    let index = 0;

    const grid = [];

    const vertex = new Vec3();
    const normal = new Vec3();

    // generate vertices, normals and uvs

    for (let iy = 0; iy <= heightSegments; iy++)
    {
        const verticesRow = [];

        const v = iy / heightSegments;

        // special case for the poles

        let uOffset = 0;

        if (iy === 0 && thetaStart === 0)
        {
            uOffset = 0.5 / widthSegments;
        }
        else if (iy === heightSegments && thetaEnd == Math.PI)
        {
            uOffset = - 0.5 / widthSegments;
        }

        for (let ix = 0; ix <= widthSegments; ix++)
        {
            const u = ix / widthSegments;

            // vertex

            vertex.x = -radius * Math.cos(phiStart + u * phiLength) * Math.sin(thetaStart + v * thetaLength);
            vertex.y = radius * Math.cos(thetaStart + v * thetaLength);
            vertex.z = radius * Math.sin(phiStart + u * phiLength) * Math.sin(thetaStart + v * thetaLength);

            vertices.push(vertex.x, vertex.y, vertex.z);

            // normal

            Vec3Normalize(vertex, normal);

            normals.push(normal.x, normal.y, normal.z);

            // uv

            uvs.push(u + uOffset, 1 - v);

            verticesRow.push(index++);
        }

        grid.push(verticesRow);
    }

    // indices

    for (let iy = 0; iy < heightSegments; iy++)
    {
        for (let ix = 0; ix < widthSegments; ix++)
        {
            const a = grid[ iy ][ ix + 1 ];
            const b = grid[ iy ][ ix ];
            const c = grid[ iy + 1 ][ ix ];
            const d = grid[ iy + 1 ][ ix + 1 ];

            if (iy !== 0 || thetaStart > 0)
            {
                indices.push(a, b, d);
            }

            if (iy !== heightSegments - 1 || thetaEnd < Math.PI)
            {
                indices.push(b, c, d);
            }
        }
    }

    data.numberOfVertices = vertices.length;

    return data;
}
