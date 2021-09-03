import { SetDirtyParents } from '../dirty/SetDirtyParents';

export function SetAlpha (id: number, value: number): void
{
    // ColorComponent.a[id] = value;

    SetDirtyParents(id);
}
