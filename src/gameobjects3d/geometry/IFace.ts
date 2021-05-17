import { IVec3Like } from '../../math/vec3/IVec3Like';
import { Vertex } from '../../components/Vertex';

export interface IFace
{
    vertex1: Vertex;
    vertex2: Vertex;
    vertex3: Vertex;

    normal1: IVec3Like;
    normal2: IVec3Like;
    normal3: IVec3Like;

    color: number;
    alpha: number;

    size: number;

    addToBuffer (F32: Float32Array, U32: Uint32Array, textureID: number, offset: number): number;
}
