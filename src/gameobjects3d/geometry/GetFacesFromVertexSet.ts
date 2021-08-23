import { FaceUVNormalTexture } from './FaceUVNormalTexture';
import { IFace } from './IFace';
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

export function GetFacesFromVertexSet (data: VertexSet): IFace[]
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

    const faces = [];

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

        const f = new FaceUVNormalTexture(
            { x: v1[0], y: v1[1], z: v1[2] },
            { x: v2[0], y: v2[1], z: v2[2] },
            { x: v3[0], y: v3[1], z: v3[2] },
            { x: n1[0], y: n1[1], z: n1[2] },
            { x: n2[0], y: n2[1], z: n2[2] },
            { x: n3[0], y: n3[1], z: n3[2] },
            { x: uv1[0], y: uv1[1] },
            { x: uv2[0], y: uv2[1] },
            { x: uv3[0], y: uv3[1] },
            1
        );

        faces.push(f);
    }

    return faces;
}
