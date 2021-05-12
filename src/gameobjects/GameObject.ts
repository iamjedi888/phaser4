import { BoundsComponent } from './components/bounds/BoundsComponent';
import { DIRTY_CONST } from './DIRTY_CONST';
import { DestroyChildren } from '../display/DestroyChildren';
import { DestroyEvent } from './events/DestroyEvent';
import { Emit } from '../events/Emit';
import { GameInstance } from '../GameInstance';
import { IBaseWorld } from '../world/IBaseWorld';
import { IBoundsComponent } from './components/bounds/IBoundsComponent';
import { ICanvasRenderer } from '../renderer/canvas/ICanvasRenderer';
import { IEventInstance } from '../events/IEventInstance';
import { IGameObject } from './IGameObject';
import { IInputComponent } from './components/input/IInputComponent';
import { IRenderPass } from '../renderer/webgl1/renderpass/IRenderPass';
import { ITransformComponent } from './components/transform/ITransformComponent';
import { InputComponent } from './components/input/InputComponent';
import { Rectangle } from '../geom/rectangle/Rectangle';
import { ReparentChildren } from '../display/ReparentChildren';
import { TransformComponent } from './components/transform/TransformComponent';
import { Vertex } from './components/Vertex';

export class GameObject implements IGameObject
{
    type: string = 'GameObject';
    name: string = '';

    //  The World this Game Object belongs to. A Game Object can only belong to one World instance at any one time.
    world: IBaseWorld;

    //  The direct parent of this Game Object in the scene graph (if any)
    parent: IGameObject;

    children: IGameObject[];

    events: Map<string, Set<IEventInstance>>;

    willUpdate: boolean = true;
    willUpdateChildren: boolean = true;

    willRender: boolean = true;
    willRenderChildren: boolean = true;
    willCacheChildren: boolean = false;

    dirty: number = 0;
    dirtyFrame: number = 0;

    transform: ITransformComponent;
    bounds: IBoundsComponent;
    input: IInputComponent;
    vertices: Vertex[];

    visible: boolean = true;

    constructor (x: number = 0, y: number = 0)
    {
        this.children = [];
        this.vertices = [];

        this.events = new Map();

        this.transform = new TransformComponent(this, x, y);
        this.bounds = new BoundsComponent(this);
        this.input = new InputComponent(this);

        this.dirty = DIRTY_CONST.DEFAULT;

        this.transform.update();
    }

    isRenderable (): boolean
    {
        return (this.visible && this.willRender);
    }

    isDirty (flag: number): boolean
    {
        return (this.dirty & flag) !== 0;
    }

    clearDirty (flag: number): this
    {
        if (this.isDirty(flag))
        {
            this.dirty ^= flag;
        }

        return this;
    }

    setDirty (flag: number, flag2?: number): this
    {
        if (!this.isDirty(flag))
        {
            this.dirty ^= flag;
            this.dirtyFrame = GameInstance.getFrame();
        }

        if (!this.isDirty(flag2))
        {
            this.dirty ^= flag2;
        }

        return this;
    }

    update (delta: number, time: number): void
    {
        if (this.willUpdateChildren)
        {
            const children = this.children;

            for (let i = 0; i < children.length; i++)
            {
                const child = children[i];

                if (child && child.willUpdate)
                {
                    child.update(delta, time);
                }
            }
        }

        this.postUpdate(delta, time);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    postUpdate (delta: number, time: number): void
    {
        //  Empty for parent classes to use.
        //  Called after this GameObject and all of its children have been updated.
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    renderGL <T extends IRenderPass> (renderPass: T): void
    {
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    renderCanvas <T extends ICanvasRenderer> (renderer: T): void
    {
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    postRenderGL <T extends IRenderPass> (renderPass: T): void
    {
        //  Called after this GameObject and all of its children have been rendered.
        //  If it doesn't have any children, this method is never called.
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    postRenderCanvas <T extends ICanvasRenderer> (renderer: T): void
    {
        //  Called after this GameObject and all of its children have been rendered.
        //  If it doesn't have any children, this method is never called.
    }

    get numChildren (): number
    {
        return this.children.length;
    }

    getBounds (): Rectangle
    {
        return this.bounds.get();
    }

    destroy (reparentChildren?: IGameObject): void
    {
        if (reparentChildren)
        {
            ReparentChildren(this, reparentChildren);
        }
        else
        {
            DestroyChildren(this);
        }

        Emit(this, DestroyEvent, this);

        this.transform.destroy();
        this.bounds.destroy();
        this.input.destroy();

        this.events.clear();

        this.world = null;
        this.parent = null;
        this.children = null;

        this.vertices = [];
    }
}
