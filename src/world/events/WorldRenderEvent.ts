import { IBaseWorld } from '../IBaseWorld';
import { IWorldRenderData } from '../IWorldRenderData';

export const WorldRenderEvent: string = 'render';

export type WorldRenderEventHandler = (renderData: IWorldRenderData, world: IBaseWorld) => void;
