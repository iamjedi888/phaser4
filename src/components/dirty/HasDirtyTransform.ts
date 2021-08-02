import { DirtyComponent } from './DirtyComponent';

export function HasDirtyTransform (id: number): boolean
{
    return Boolean(DirtyComponent.transform[id]);
}
