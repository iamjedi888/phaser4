import { ColorComponent } from './ColorComponent';

export function SetAlpha (id: number, value: number): void
{
    ColorComponent.alpha[id] = value;
}
