import { ColorComponent } from './ColorComponent';
import { SetDirtyParents } from '../dirty';

export function SetAlpha (id: number, value: number): void
{
    ColorComponent.alpha[id] = value;

    SetDirtyParents(id);
}
