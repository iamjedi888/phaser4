import { IBaseWorld } from '../IBaseWorld';

export const WorldShutdownEvent: string = 'shutdown';

export type WorldShutdownEventHandler = (world: IBaseWorld) => void;
