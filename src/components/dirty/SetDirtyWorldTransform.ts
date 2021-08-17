import { DirtyComponent } from './DirtyComponent';

export function SetDirtyWorldTransform (id: number): void
{
    DirtyComponent.worldTransform[id] = 1;
}
