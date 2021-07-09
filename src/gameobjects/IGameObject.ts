import { ICanvasRenderer } from '../renderer/canvas/ICanvasRenderer';
import { IEventInstance } from '../events/IEventInstance';
import { IRenderPass } from '../renderer/webgl1/renderpass/IRenderPass';

export interface IGameObject
{
    readonly id: number;
    readonly type: string;

    name: string;

    visible: boolean;
    visibleChildren: boolean;

    events: Map<string, Set<IEventInstance>>;

    depth: number;

    isRenderable (): boolean;

    beforeUpdate (delta: number, time: number): void;
    update (delta: number, time: number): void;
    afterUpdate (delta: number, time: number): void;

    preRenderGL <T extends IRenderPass> (renderPass: T): void;
    renderGL <T extends IRenderPass> (renderPass: T): void;
    postRenderGL <T extends IRenderPass> (renderPass: T): void;

    renderCanvas <T extends ICanvasRenderer> (renderer: T): void;
    postRenderCanvas <T extends ICanvasRenderer> (renderer: T): void;

    hasParent (id?: number): boolean;
    getParent (): IGameObject;
    getChildren (): IGameObject[];
    getNumChildren (): number;

    toString (): string;

    destroy (reparentChildren?: IGameObject): void;
}
