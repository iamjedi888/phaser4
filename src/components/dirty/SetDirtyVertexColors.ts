import { DirtyComponent } from './DirtyComponent';

export function SetDirtyVertexColors (id: number): void
{
    DirtyComponent.vertexColors[id] = 1;
}
