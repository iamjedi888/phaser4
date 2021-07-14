import { ColorComponent } from './ColorComponent';
import { SetDirtyParents } from '../dirty';

export function SetTint (id: number, value: number): void
{
    // ColorComponent.tint[id] = value;

    SetDirtyParents(id);
}
