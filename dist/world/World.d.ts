import { BaseWorld } from './BaseWorld';
import { IGameObject } from '../gameobjects/IGameObject';
import { IRenderPass } from '../renderer/webgl1/renderpass/IRenderPass';
import { IScene } from '../scenes/IScene';
import { IWorld } from './IWorld';
import { WorldCamera } from '../camera/WorldCamera';
export declare class World extends BaseWorld implements IWorld {
    readonly type: string;
    camera: WorldCamera;
    constructor(scene: IScene);
    preRender(gameFrame: number): boolean;
    renderGL<T extends IRenderPass>(renderPass: T): void;
    getRenderList(): IGameObject[];
}
//# sourceMappingURL=World.d.ts.map