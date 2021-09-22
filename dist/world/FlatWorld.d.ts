import { BaseWorld } from './BaseWorld';
import { IFlatWorld } from './IFlatWorld';
import { IGameObject } from '../gameobjects/IGameObject';
import { IRenderPass } from '../renderer/webgl1/renderpass/IRenderPass';
import { IScene } from '../scenes/IScene';
import { WorldCamera } from '../camera/WorldCamera';
export declare class FlatWorld extends BaseWorld implements IFlatWorld {
    readonly type: string;
    camera: WorldCamera;
    constructor(scene: IScene);
    preRender(gameFrame: number): boolean;
    renderGL<T extends IRenderPass>(renderPass: T): void;
    getRenderList(): IGameObject[];
}
//# sourceMappingURL=FlatWorld.d.ts.map