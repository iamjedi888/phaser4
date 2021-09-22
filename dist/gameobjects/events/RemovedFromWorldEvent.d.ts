import { IBaseWorld } from '../../world/IBaseWorld';
import { IGameObject } from '../IGameObject';
export declare const RemovedFromWorldEvent: string;
export declare type RemovedFromWorldEventHandler = <T extends IGameObject, U extends IBaseWorld>(child: T, world: U) => void;
//# sourceMappingURL=RemovedFromWorldEvent.d.ts.map