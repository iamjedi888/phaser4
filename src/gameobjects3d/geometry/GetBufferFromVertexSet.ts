import { VertexBuffer } from '../../renderer/webgl1/buffers';
import { VertexSet } from './VertexSet';

function GetVec3 (data: number[], index: number): number[]
{
    const x = data[ (index * 3) + 0 ];
    const y = data[ (index * 3) + 1 ];
    const z = data[ (index * 3) + 2 ];

    return [ x, y, z ];
}

function GetVec2 (data: number[], index: number): number[]
{
    const x = data[ (index * 2) + 0 ];
    const y = data[ (index * 2) + 1 ];

    return [ x, y ];
}

function CreateNonIndexedVertexBuffer (data: VertexSet): VertexBuffer
{
    const {
        vertices,
        normals,
        uvs
    } = data;

    // console.log(vertices);
    // console.log(normals);
    // console.log(uvs);

    const total = vertices.length;
    const count = total / 3;
    const batchSize = count / 3;

    const buffer = new VertexBuffer({ batchSize, isDynamic: false, vertexElementSize: 8, elementsPerEntry: 3 });

    const F32 = buffer.vertexViewF32;

    let offset = 0;
    let uvIndex = 0;

    for (let i = 0; i < total; i += 3)
    {
        F32[offset++] = vertices[i + 0];
        F32[offset++] = vertices[i + 1];
        F32[offset++] = vertices[i + 2];
        F32[offset++] = normals[i + 0];
        F32[offset++] = normals[i + 1];
        F32[offset++] = normals[i + 2];
        F32[offset++] = uvs[uvIndex + 0];
        F32[offset++] = uvs[uvIndex + 1];

        uvIndex += 2;
    }

    buffer.count = count;

    return buffer;
}

function CreateVertexBuffer (data: VertexSet): VertexBuffer
{
    const {
        vertices,
        normals,
        uvs,
        indices
    } = data;

    // console.log(vertices);
    // console.log(normals);
    // console.log(uvs);
    // console.log(indices);

    const buffer = new VertexBuffer({ batchSize: indices.length / 3, isDynamic: false, vertexElementSize: 8, elementsPerEntry: 3 });

    const F32 = buffer.vertexViewF32;

    let offset = 0;

    for (let i = 0; i < indices.length; i += 3)
    {
        const i1 = indices[i + 0];
        const i2 = indices[i + 1];
        const i3 = indices[i + 2];

        const v1 = GetVec3(vertices, i1);
        const v2 = GetVec3(vertices, i2);
        const v3 = GetVec3(vertices, i3);

        const n1 = GetVec3(normals, i1);
        const n2 = GetVec3(normals, i2);
        const n3 = GetVec3(normals, i3);

        const uv1 = GetVec2(uvs, i1);
        const uv2 = GetVec2(uvs, i2);
        const uv3 = GetVec2(uvs, i3);

        F32[offset++] = v1[0];
        F32[offset++] = v1[1];
        F32[offset++] = v1[2];
        F32[offset++] = n1[0];
        F32[offset++] = n1[1];
        F32[offset++] = n1[2];
        F32[offset++] = uv1[0];
        F32[offset++] = uv1[1];

        F32[offset++] = v2[0];
        F32[offset++] = v2[1];
        F32[offset++] = v2[2];
        F32[offset++] = n2[0];
        F32[offset++] = n2[1];
        F32[offset++] = n2[2];
        F32[offset++] = uv2[0];
        F32[offset++] = uv2[1];

        F32[offset++] = v3[0];
        F32[offset++] = v3[1];
        F32[offset++] = v3[2];
        F32[offset++] = n3[0];
        F32[offset++] = n3[1];
        F32[offset++] = n3[2];
        F32[offset++] = uv3[0];
        F32[offset++] = uv3[1];
    }

    buffer.count = indices.length;

    return buffer;
}

export function GetBufferFromVertexSet (data: VertexSet): VertexBuffer
{
    if (data.indices && data.indices.length > 0)
    {
        return CreateVertexBuffer(data);
    }
    else
    {
        return CreateNonIndexedVertexBuffer(data);
    }
}
