import { IBaseWorld3D } from '../world3d/IBaseWorld3D';
import { IEventInstance } from '../events/IEventInstance';
import { IRenderPass } from '../renderer/webgl1/renderpass/IRenderPass';

export interface IGameObject3D
{
    type: string;
    name: string;
    world: IBaseWorld3D;
    parent: IGameObject3D;
    children: IGameObject3D[];

    willUpdate: boolean;
    willUpdateChildren: boolean;
    willRender: boolean;
    willRenderChildren: boolean;
    willCacheChildren: boolean;

    numChildren: number;

    dirty: number;
    dirtyFrame: number;

    visible: boolean;

    events: Map<string, Set<IEventInstance>>;

    isRenderable (): boolean;
    isDirty (flag: number): boolean;
    clearDirty (flag: number): this;
    setDirty (flag: number, flag2?: number): this;

    update (delta: number, time: number): void;
    postUpdate (delta: number, time: number): void;

    renderGL <T extends IRenderPass> (renderPass: T): void;
    postRenderGL <T extends IRenderPass> (renderPass: T): void;

    destroy (reparentChildren?: IGameObject3D): void;
}
