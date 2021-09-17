import { IBaseWorld } from '../IBaseWorld';

export const WorldPreRenderEvent: string = 'prerender';

export type WorldPreRenderEventHandler = <T extends IBaseWorld> (world: T) => void;
