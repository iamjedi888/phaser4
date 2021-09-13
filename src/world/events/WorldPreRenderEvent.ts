import { IBaseWorld } from '../IBaseWorld';

export const WorldPreRenderEvent: string = 'worldprerender';

export type WorldPreRenderEventHandler = <T extends IBaseWorld> (world: T) => void;
