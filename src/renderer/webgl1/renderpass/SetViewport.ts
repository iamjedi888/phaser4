import { AddViewport } from './AddViewport';
import { BindViewport } from './BindViewport';

export function SetViewport (x: number = 0, y: number = 0, width: number = 0, height: number = 0): void
{
    const entry = AddViewport(x, y, width, height);

    BindViewport(entry);
}
