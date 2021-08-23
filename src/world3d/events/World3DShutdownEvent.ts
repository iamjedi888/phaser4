import { IBaseWorld3D } from '../IBaseWorld3D';

export const World3DShutdownEvent: string = 'worldshutdown';

export type World3DShutdownEventHandler = (world: IBaseWorld3D) => void;
