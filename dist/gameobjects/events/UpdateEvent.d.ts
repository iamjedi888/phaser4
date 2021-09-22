import { IGameObject } from '../IGameObject';
export declare const UpdateEvent: string;
export declare type UpdateEventHandler = <T extends IGameObject>(delta: number, time: number, child: T) => void;
//# sourceMappingURL=UpdateEvent.d.ts.map