import { DirtyComponent } from './DirtyComponent';

export function HasDirtyWorldTransform (id: number): boolean
{
    return Boolean(DirtyComponent.worldTransform[id]);
}
