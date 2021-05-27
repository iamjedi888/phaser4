import { IGameObject } from '../IGameObject';

export const AfterUpdateEvent: string = 'afterupdate';

export type AfterUpdateEventHandler = <T extends IGameObject> (delta: number, time: number, child: T) => void;
