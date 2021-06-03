import { IBaseWorld } from '../IBaseWorld';

export const WorldAfterUpdateEvent: string = 'afterupdate';

export type WorldAfterUpdateEventHandler = <T extends IBaseWorld> (delta: number, time: number, world: T) => void;
