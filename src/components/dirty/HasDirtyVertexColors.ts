import { DirtyComponent } from './DirtyComponent';

export function HasDirtyVertexColors (id: number): boolean
{
    return Boolean(DirtyComponent.vertexColors[id]);
}
