import { IBaseWorld } from '../IBaseWorld';

export const WorldBeforeUpdateEvent: string = 'beforeupdate';

export type WorldBeforeUpdateEventHandler = <T extends IBaseWorld> (delta: number, time: number, world: T) => void;
