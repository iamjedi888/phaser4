import { IBaseWorld } from '../IBaseWorld';

export const WorldUpdateEvent: string = 'update';

export type WorldUpdateEventHandler = <T extends IBaseWorld> (delta: number, time: number, world: T) => void;
