import { ColorComponent } from './ColorComponent';
import { SetDirtyParents } from '../dirty';

export function SetAlpha (id: number, value: number): void
{
    ColorComponent.a[id] = value;

    SetDirtyParents(id);
}
