import { DirtyComponent } from './DirtyComponent';

export function ClearDirtyWorldTransform (id: number): void
{
    DirtyComponent.worldTransform[id] = 0;
}
