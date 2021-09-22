/// <reference types="bitecs" />
import { Color } from '../components/color/Color';
import { GameObject } from '../gameobjects/GameObject';
import { IBaseCamera } from '../camera/IBaseCamera';
import { IBaseWorld } from './IBaseWorld';
import { IGameObject } from '../gameobjects/IGameObject';
import { IRenderPass } from '../renderer/webgl1/renderpass/IRenderPass';
import { IScene } from '../scenes/IScene';
import { IWorldRenderData } from './IWorldRenderData';
export declare class BaseWorld extends GameObject implements IBaseWorld {
    readonly type: string;
    tag: import("bitecs").ComponentType<import("bitecs").ISchema>;
    scene: IScene;
    camera: IBaseCamera;
    is3D: boolean;
    updateDisplayList: boolean;
    color: Color;
    renderData: IWorldRenderData;
    stack: Uint32Array;
    private totalChildren;
    private totalChildrenQuery;
    constructor(scene: IScene);
    getNumChildren(): number;
    beforeUpdate(delta: number, time: number): void;
    update(delta: number, time: number): void;
    afterUpdate(delta: number, time: number): void;
    preRender(gameFrame: number): boolean;
    renderGL<T extends IRenderPass>(renderPass: T): void;
    shutdown(): void;
    destroy(reparentChildren?: IGameObject): void;
}
//# sourceMappingURL=BaseWorld.d.ts.map