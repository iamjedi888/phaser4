import { Vertex } from '../../../components/Vertex';

export function PackColors (vertices: Vertex[]): void
{
    vertices.forEach(vertex =>
    {
        vertex.packColor();
    });
}
