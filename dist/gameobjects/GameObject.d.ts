import { ICanvasRenderer } from '../renderer/canvas/ICanvasRenderer';
import { IEventInstance } from '../events/IEventInstance';
import { IGameObject } from './IGameObject';
import { IRenderPass } from '../renderer/webgl1/renderpass/IRenderPass';
export declare class GameObject implements IGameObject {
    readonly id: number;
    readonly type: string;
    name: string;
    events: Map<string, Set<IEventInstance>>;
    constructor();
    isRenderable(): boolean;
    beforeUpdate(delta: number, time: number): void;
    update(delta: number, time: number): void;
    afterUpdate(delta: number, time: number): void;
    preRenderGL<T extends IRenderPass>(renderPass: T): void;
    renderGL<T extends IRenderPass>(renderPass: T): void;
    renderCanvas<T extends ICanvasRenderer>(renderer: T): void;
    postRenderGL<T extends IRenderPass>(renderPass: T): void;
    postRenderCanvas<T extends ICanvasRenderer>(renderer: T): void;
    set visible(value: boolean);
    get visible(): boolean;
    set visibleChildren(value: boolean);
    get visibleChildren(): boolean;
    hasParent(id?: number): boolean;
    getParent(): IGameObject | undefined;
    getChildren<T extends IRenderPass>(renderPass?: T): IGameObject[];
    getNumChildren(): number;
    onAddChild(childID: number): void;
    onUpdateChild(childID: number): void;
    onRemoveChild(childID: number): void;
    getDisplayData(): {
        id: number;
        parent: number;
        world: number;
        numChildren: number;
    };
    toString(): string;
    destroy<P extends IGameObject>(reparentChildren?: P): void;
}
//# sourceMappingURL=GameObject.d.ts.map