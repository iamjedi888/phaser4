import { SetDirtyParents } from '../dirty/SetDirtyParents';

export function SetTint (id: number, value: number): void
{
    // ColorComponent.tint[id] = value;

    SetDirtyParents(id);
}
