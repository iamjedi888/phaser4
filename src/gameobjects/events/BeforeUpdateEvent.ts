import { IGameObject } from '../IGameObject';

export const BeforeUpdateEvent: string = 'beforeupdate';

export type BeforeUpdateEventHandler = <T extends IGameObject> (delta: number, time: number, child: T) => void;
