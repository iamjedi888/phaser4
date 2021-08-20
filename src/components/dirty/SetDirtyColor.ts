import { DirtyComponent } from './DirtyComponent';
import { GetWorldID } from '../hierarchy/GetWorldID';

export function SetDirtyColor (id: number): void
{
    DirtyComponent.color[id] = 1;

    const world = GetWorldID(id);

    if (world)
    {
        DirtyComponent.color[world] = 1;
    }
}
