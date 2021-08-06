import { DirtyComponent } from './DirtyComponent';

export function HasDirtyColor (id: number): boolean
{
    return Boolean(DirtyComponent.color[id]);
}
