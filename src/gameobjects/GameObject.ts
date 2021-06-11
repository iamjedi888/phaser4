import { AddHierarchyComponent, GetChildren, GetNumChildren, GetParentGameObject, HierarchyComponent } from '../components/hierarchy';
import { AddPermissionsComponent, PermissionsComponent, WillRender, WillUpdate, WillUpdateChildren } from '../components/permissions';

import { AddDirtyComponent } from '../components/dirty/AddDirtyComponent';
import { DestroyChildren } from '../display/DestroyChildren';
import { DestroyEvent } from './events/DestroyEvent';
import { Emit } from '../events/Emit';
import { GameObjectCache } from './GameObjectCache';
import { GameObjectTree } from './GameObjectTree';
import { GameObjectWorld } from '../GameObjectWorld';
import { ICanvasRenderer } from '../renderer/canvas/ICanvasRenderer';
import { IEventInstance } from '../events/IEventInstance';
import { IGameObject } from './IGameObject';
import { IRenderPass } from '../renderer/webgl1/renderpass/IRenderPass';
import { ReparentChildren } from '../display/ReparentChildren';
import { addEntity } from 'bitecs';

export class GameObject implements IGameObject
{
    readonly id: number = addEntity(GameObjectWorld);

    readonly type: string = 'GameObject';

    //  User defined name. Never used internally.
    name: string = '';

    events: Map<string, Set<IEventInstance>>;

    constructor ()
    {
        const id = this.id;

        AddHierarchyComponent(id);
        AddPermissionsComponent(id);
        AddDirtyComponent(id);

        GameObjectCache.set(id, this);
        GameObjectTree.set(id, []);

        this.events = new Map();
    }

    isRenderable (): boolean
    {
        return WillRender(this.id);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    beforeUpdate (delta: number, time: number): void
    {
        //  Empty for parent classes to use.
        //  Called before this GameObject and all of its children have been updated.
    }

    update (delta: number, time: number): void
    {
        this.beforeUpdate(delta, time);

        if (WillUpdateChildren(this.id))
        {
            const children = GameObjectTree.get(this.id);

            for (let i = 0; i < children.length; i++)
            {
                const childID = children[i];

                if (WillUpdate(childID))
                {
                    GameObjectCache.get(childID).update(delta, time);
                }
            }
        }

        this.afterUpdate(delta, time);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    afterUpdate (delta: number, time: number): void
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

    set visible (value: boolean)
    {
        PermissionsComponent.visible[this.id] = Number(value);
    }

    get visible (): boolean
    {
        return Boolean(PermissionsComponent.visible[this.id]);
    }

    set visibleChildren (value: boolean)
    {
        PermissionsComponent.visibleChildren[this.id] = Number(value);
    }

    get visibleChildren (): boolean
    {
        return Boolean(PermissionsComponent.visibleChildren[this.id]);
    }

    set depth (value: number)
    {
        HierarchyComponent.depth[this.id] = value;
    }

    get depth (): number
    {
        return HierarchyComponent.depth[this.id];
    }

    hasParent (): boolean
    {
        return (HierarchyComponent.parentID[this.id] > 0);
    }

    getParent (): IGameObject | undefined
    {
        return GetParentGameObject(this.id);
    }

    getChildren (): IGameObject[]
    {
        return GetChildren(this.id);
    }

    getNumChildren (): number
    {
        return GetNumChildren(this.id);
    }

    toString (): string
    {
        return `[ ${this.type} id="${this.id}" ]`;
    }

    destroy <P extends IGameObject> (reparentChildren?: P): void
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

        this.events = null;

        //  TODO - Destroy process, remove from Cache, Tree, etc.
    }
}
