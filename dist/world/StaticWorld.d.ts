import { BaseWorld } from './BaseWorld';
import { IGameObject } from '../gameobjects/IGameObject';
import { IRenderPass } from '../renderer/webgl1/renderpass/IRenderPass';
import { IScene } from '../scenes/IScene';
import { IStaticWorld } from './IStaticWorld';
import { StaticCamera } from '../camera/StaticCamera';
export declare class StaticWorld extends BaseWorld implements IStaticWorld {
    readonly type: string;
    camera: StaticCamera;
    constructor(scene: IScene);
    preRender(gameFrame: number): boolean;
    renderGL<T extends IRenderPass>(renderPass: T): void;
    getRenderList(): IGameObject[];
}
//# sourceMappingURL=StaticWorld.d.ts.map