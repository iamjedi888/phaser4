import { DirtyComponent } from './DirtyComponent';

export function ClearDirtyTransform (id: number): void
{
    DirtyComponent.transform[id] = 0;
}
