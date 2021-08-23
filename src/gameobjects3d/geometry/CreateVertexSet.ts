import { VertexSet } from './VertexSet';

export function CreateVertexSet (): VertexSet
{
    return {
        vertices: [],
        normals: [],
        uvs: [],
        indices: [],
        numberOfVertices: 0
    };
}
