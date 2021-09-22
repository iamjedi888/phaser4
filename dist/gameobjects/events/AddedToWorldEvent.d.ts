import { IBaseWorld } from '../../world/IBaseWorld';
import { IGameObject } from '../IGameObject';
export declare const AddedToWorldEvent: string;
export declare type AddedToWorldEventHandler = <T extends IGameObject, U extends IBaseWorld>(child: T, world: U) => void;
//# sourceMappingURL=AddedToWorldEvent.d.ts.map