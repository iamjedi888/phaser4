import { DirtyComponent } from './DirtyComponent';

export function SetDirtyTransform (id: number): void
{
    DirtyComponent.transform[id] = 1;
}
