import { IVec2Like } from '../../math/vec2/IVec2Like';
import { IVec3Like } from '../../math/vec3/IVec3Like';
import { Vertex } from '../../components';
export declare class FaceUVNormalTexture {
    vertex1: Vertex;
    vertex2: Vertex;
    vertex3: Vertex;
    normal1: IVec3Like;
    normal2: IVec3Like;
    normal3: IVec3Like;
    color: number;
    alpha: number;
    size: number;
    private _packedColor;
    constructor(v1: IVec3Like, v2: IVec3Like, v3: IVec3Like, n1: IVec3Like, n2: IVec3Like, n3: IVec3Like, uv1: IVec2Like, uv2: IVec2Like, uv3: IVec2Like, scale?: number);
    setColor(color: number, alpha?: number): void;
    addToBuffer(F32: Float32Array, U32: Uint32Array, textureID: number, offset: number): number;
}
//# sourceMappingURL=FaceUVNormalTexture.d.ts.map