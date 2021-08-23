import { CreateVertexSet } from '../gameobjects3d/geometry/CreateVertexSet';
import { Vec2 } from '../math/vec2/Vec2';
import { Vec3 } from '../math/vec3/Vec3';
import { Vec3Normalize } from '../math/vec3/Vec3Normalize';
import { VertexSet } from '../gameobjects3d/geometry/VertexSet';

function GenerateCap (top: boolean, data: VertexSet, index: number, halfHeight: number, radiusTop: number, radiusBottom: number, radialSegments: number, thetaStart: number, thetaLength: number): number
{
    // buffers
    const {
        vertices,
        normals,
        uvs,
        indices
    } = data;

    const uv = new Vec2();
    const vertex = new Vec3();

    const radius = (top === true) ? radiusTop : radiusBottom;
    const sign = (top === true) ? 1 : - 1;

    // save the index of the first center vertex
    const centerIndexStart = index;

    // first we generate the center vertex data of the cap.
    // because the geometry needs one set of uvs per face,
    // we must generate a center vertex per face/segment

    for (let x = 1; x <= radialSegments; x++)
    {
        // vertex
        vertices.push(0, halfHeight * sign, 0);

        // normal
        normals.push(0, sign, 0);

        // uv
        uvs.push(0.5, 0.5);

        // increase index
        index++;
    }

    // save the index of the last center vertex
    const centerIndexEnd = index;

    // now we generate the surrounding vertices, normals and uvs

    for (let x = 0; x <= radialSegments; x++)
    {
        const u = x / radialSegments;
        const theta = u * thetaLength + thetaStart;

        const cosTheta = Math.cos(theta);
        const sinTheta = Math.sin(theta);

        // vertex
        vertex.x = radius * sinTheta;
        vertex.y = halfHeight * sign;
        vertex.z = radius * cosTheta;

        vertices.push(vertex.x, vertex.y, vertex.z);

        // normal
        normals.push(0, sign, 0);

        // uv
        uv.x = (cosTheta * 0.5) + 0.5;
        uv.y = (sinTheta * 0.5 * sign) + 0.5;
        uvs.push(uv.x, uv.y);

        // increase index
        index++;
    }

    // generate indices

    for (let x = 0; x < radialSegments; x++)
    {
        const c = centerIndexStart + x;
        const i = centerIndexEnd + x;

        if (top)
        {
            // face top
            indices.push(i, i + 1, c);
        }
        else
        {
            // face bottom
            indices.push(i + 1, i, c);
        }
    }

    return index;
}

export function CylinderGeometry (radiusTop: number = 1, radiusBottom: number = 1, height: number = 1, radialSegments: number = 8, heightSegments: number = 1, openEnded: boolean = false, thetaStart: number = 0, thetaLength: number = Math.PI * 2): VertexSet
{
    const data = CreateVertexSet();

    // buffers
    const {
        vertices,
        normals,
        uvs,
        indices
    } = data;

    // helper variables
    let index = 0;

    const indexArray = [];
    const halfHeight = height / 2;

    const normal = new Vec3();
    const vertex = new Vec3();

    //  This will be used to calculate the normal
    const slope = (radiusBottom - radiusTop) / height;

    // generate vertices, normals and uvs

    for (let y = 0; y <= heightSegments; y++)
    {
        const indexRow = [];

        const v = y / heightSegments;

        // calculate the radius of the current row

        const radius = v * (radiusBottom - radiusTop) + radiusTop;

        for (let x = 0; x <= radialSegments; x++)
        {
            const u = x / radialSegments;

            const theta = u * thetaLength + thetaStart;

            const sinTheta = Math.sin(theta);
            const cosTheta = Math.cos(theta);

            // vertex
            vertex.x = radius * sinTheta;
            vertex.y = - v * height + halfHeight;
            vertex.z = radius * cosTheta;

            vertices.push(vertex.x, vertex.y, vertex.z);

            // normal
            normal.set(sinTheta, slope, cosTheta);

            Vec3Normalize(normal, normal);

            normals.push(normal.x, normal.y, normal.z);

            // uv
            uvs.push(u, 1 - v);

            // save index of vertex in respective row
            indexRow.push(index++);
        }

        // now save vertices of the row in our index array
        indexArray.push(indexRow);
    }

    // generate indices

    for (let x = 0; x < radialSegments; x++)
    {
        for (let y = 0; y < heightSegments; y++)
        {
            // we use the index array to access the correct indices

            const a = indexArray[y][x];
            const b = indexArray[y + 1][x];
            const c = indexArray[y + 1][x + 1];
            const d = indexArray[y][x + 1];

            // faces
            indices.push(a, b, d);
            indices.push(b, c, d);

            // update group counter
            // groupCount += 6;
        }
    }

    if (!openEnded)
    {
        if (radiusTop > 0)
        {
            index = GenerateCap(true, data, index, halfHeight, radiusTop, radiusBottom, radialSegments, thetaStart, thetaLength);
        }

        if (radiusBottom > 0)
        {
            GenerateCap(false, data, index, halfHeight, radiusTop, radiusBottom, radialSegments, thetaStart, thetaLength);
        }
    }

    data.numberOfVertices = vertices.length;

    return data;
}
