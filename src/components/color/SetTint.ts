import { ColorComponent } from './ColorComponent';

export function SetTint (id: number, value: number): void
{
    ColorComponent.tint[id] = value;
}
