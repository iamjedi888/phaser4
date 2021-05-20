import { AddPermissionsComponent, WillRender } from '../components/permissions';

import { AddDirtyComponent } from '../components/dirty/AddDirtyComponent';
import { DestroyChildren } from '../display/DestroyChildren';
import { DestroyEvent } from './events/DestroyEvent';
import { Emit } from '../events/Emit';
import { GameObjectCache } from './GameObjectCache';
import { GameObjectWorld } from '../components/GameObjectWorld';
import { IBaseWorld } from '../world/IBaseWorld';
import { ICanvasRenderer } from '../renderer/canvas/ICanvasRenderer';
import { IEventInstance } from '../events/IEventInstance';
import { IGameObject } from './IGameObject';
import { IRenderPass } from '../renderer/webgl1/renderpass/IRenderPass';
import { ReparentChildren } from '../display/ReparentChildren';
import { addEntity } from 'bitecs';

export class GameObject implements IGameObject
{
    readonly id: number = addEntity(GameObjectWorld);

    name: string = '';

    //  The World this Game Object belongs to. A Game Object can only belong to one World instance at any one time.
    world: IBaseWorld;

    //  The direct parent of this Game Object in the scene graph (if any)
    parent: IGameObject;

    children: IGameObject[];

    events: Map<string, Set<IEventInstance>>;

    // vertices: Vertex[];

    visible: boolean = true;

    constructor ()
    {
        this.children = [];
        // this.vertices = [];

        this.events = new Map();

        // const id = addEntity(GameObjectWorld);

        AddPermissionsComponent(this.id);
        AddDirtyComponent(this.id);

        GameObjectCache.set(this.id, this);
    }

    isRenderable (): boolean
    {
        return (this.visible && WillRender(this));
    }

    /*
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
    */

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

        this.events.clear();

        this.world = null;
        this.parent = null;
        this.children = null;

        // this.vertices = [];
    }
}
