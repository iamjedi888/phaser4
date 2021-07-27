import { TimeComponent } from './TimeComponent';

export function UpdateTime (id: number, time: number): void
{
    TimeComponent.ms[id] = time - TimeComponent.lastTick[id];
}
