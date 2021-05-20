import { DirtyComponent } from './DirtyComponent';

export function HasDirtyChild (id: number): boolean
{
    return Boolean(DirtyComponent.child[id]);
}
