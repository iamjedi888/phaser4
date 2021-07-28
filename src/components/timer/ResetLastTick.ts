import { TimeComponent } from './TimeComponent';

export function ResetLastTick (id: number): void
{
    TimeComponent.lastTick[id] = performance.now();
}
