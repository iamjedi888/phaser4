import { IBaseWorld } from '../IBaseWorld';
export declare const WorldUpdateEvent: string;
export declare type WorldUpdateEventHandler = <T extends IBaseWorld>(delta: number, time: number, world: T) => void;
//# sourceMappingURL=WorldUpdateEvent.d.ts.map