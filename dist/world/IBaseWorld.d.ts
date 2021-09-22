import { ComponentType, ISchema } from 'bitecs';
import { Color } from '../components/color/Color';
import { IBaseCamera } from '../camera/IBaseCamera';
import { IColorComponent } from '../components/color/IColorComponent';
import { IGameObject } from '../gameobjects/IGameObject';
import { IRenderPass } from '../renderer/webgl1/renderpass/IRenderPass';
import { IScene } from '../scenes/IScene';
import { IWorldRenderData } from './IWorldRenderData';
export interface IBaseWorld extends IGameObject, IColorComponent {
    tag: ComponentType<ISchema>;
    scene: IScene;
    camera: IBaseCamera;
    is3D: boolean;
    updateDisplayList: boolean;
    color: Color;
    renderData: IWorldRenderData;
    stack: Uint32Array;
    beforeUpdate(delta: number, time: number): void;
    update(delta: number, time: number): void;
    afterUpdate(delta: number, time: number): void;
    preRender(gameFrame: number): boolean;
    renderGL<T extends IRenderPass>(renderPass: T): void;
    postRenderGL<T extends IRenderPass>(renderPass: T): void;
    shutdown(): void;
    destroy(reparentChildren?: IGameObject): void;
}
//# sourceMappingURL=IBaseWorld.d.ts.map