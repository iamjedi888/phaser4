import { IVec2Like } from '../../math/vec2/IVec2Like';
import { IVec3Like } from '../../math/vec3/IVec3Like';
import { PackColor } from '../../renderer/webgl1';
import { Vertex } from '../../components';

export class FaceUVNormalTexture
{
    vertex1: Vertex;
    vertex2: Vertex;
    vertex3: Vertex;

    normal1: IVec3Like;
    normal2: IVec3Like;
    normal3: IVec3Like;

    color: number = 0xffffff;
    alpha: number = 1;

    size: number = 30;

    private _packedColor: number;

    constructor (v1: IVec3Like, v2: IVec3Like, v3: IVec3Like, n1: IVec3Like, n2: IVec3Like, n3: IVec3Like, uv1: IVec2Like, uv2: IVec2Like, uv3: IVec2Like, scale: number = 1)
    {
        this.vertex1 = new Vertex(v1.x * scale, v1.y * scale, v1.z * scale);
        this.vertex2 = new Vertex(v2.x * scale, v2.y * scale, v2.z * scale);
        this.vertex3 = new Vertex(v3.x * scale, v3.y * scale, v3.z * scale);

        this.vertex1.setUV(uv1.x, uv1.y);
        this.vertex2.setUV(uv2.x, uv2.y);
        this.vertex3.setUV(uv3.x, uv3.y);

        this.normal1 = n1;
        this.normal2 = n2;
        this.normal3 = n3;

        this._packedColor = PackColor(this.color, this.alpha);
    }

    setColor (color: number, alpha: number = 1): void
    {
        this.color = color;
        this.alpha = alpha;

        this._packedColor = PackColor(color, alpha);
    }

    addToBuffer (F32: Float32Array, U32: Uint32Array, textureID: number, offset: number): number
    {
        const v1 = this.vertex1;
        const v2 = this.vertex2;
        const v3 = this.vertex3;

        const n1 = this.normal1;
        const n2 = this.normal2;
        const n3 = this.normal3;

        const color = this._packedColor;

        F32[offset++] = v1.x;
        F32[offset++] = v1.y;
        F32[offset++] = v1.z;
        F32[offset++] = n1.x;
        F32[offset++] = n1.y;
        F32[offset++] = n1.z;
        F32[offset++] = v1.u;
        F32[offset++] = v1.v;
        F32[offset++] = textureID;
        U32[offset++] = color;

        F32[offset++] = v2.x;
        F32[offset++] = v2.y;
        F32[offset++] = v2.z;
        F32[offset++] = n2.x;
        F32[offset++] = n2.y;
        F32[offset++] = n2.z;
        F32[offset++] = v2.u;
        F32[offset++] = v2.v;
        F32[offset++] = textureID;
        U32[offset++] = color;

        F32[offset++] = v3.x;
        F32[offset++] = v3.y;
        F32[offset++] = v3.z;
        F32[offset++] = n3.x;
        F32[offset++] = n3.y;
        F32[offset++] = n3.z;
        F32[offset++] = v3.u;
        F32[offset++] = v3.v;
        F32[offset++] = textureID;
        U32[offset++] = color;

        return offset;
    }
}
