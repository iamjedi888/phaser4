import { IBaseWorld } from '../world/IBaseWorld';
import { ITimerEvent } from './ITimerEvent';
export declare class Clock {
    world: IBaseWorld;
    now: number;
    timeScale: number;
    events: Set<ITimerEvent>;
    constructor(world: IBaseWorld);
    update(delta: number, time: number): void;
}
//# sourceMappingURL=Clock.d.ts.map