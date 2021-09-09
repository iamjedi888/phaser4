import { HIERARCHY, HierarchyComponent } from '../components/hierarchy/HierarchyComponent';

import { AddDirtyComponent } from '../components/dirty/AddDirtyComponent';
import { AddHierarchyComponent } from '../components/hierarchy/AddHierarchyComponent';
import { AddPermissionsComponent } from '../components/permissions/AddPermissionsComponent';
import { DestroyChildren } from '../display/DestroyChildren';
import { DestroyEvent } from './events/DestroyEvent';
import { Emit } from '../events/Emit';
import { GameObjectCache } from './GameObjectCache';
import { GameObjectWorld } from '../GameObjectWorld';
import { GetChildrenFromParentID } from '../components/hierarchy/GetChildrenFromParentID';
import { GetDepth } from '../components/hierarchy/GetDepth';
import { GetNumChildren } from '../components/hierarchy/GetNumChildren';
import { GetParentGameObject } from '../components/hierarchy/GetParentGameObject';
import { GetParentID } from '../components/hierarchy/GetParentID';
import { GetVisible } from '../components/permissions/GetVisible';
import { GetVisibleChildren } from '../components/permissions/GetVisibleChildren';
import { ICanvasRenderer } from '../renderer/canvas/ICanvasRenderer';
import { IEventInstance } from '../events/IEventInstance';
import { IGameObject } from './IGameObject';
import { IRenderPass } from '../renderer/webgl1/renderpass/IRenderPass';
import { ReparentChildren } from '../display/ReparentChildren';
import { SetDepth } from '../components/hierarchy/SetDepth';
import { SetVisible } from '../components/permissions/SetVisible';
import { SetVisibleChildren } from '../components/permissions/SetVisibleChildren';
import { WillRender } from '../components/permissions/WillRender';
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

        // this.events = new Map();
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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    update (delta: number, time: number): void
    {
        //  Empty for parent classes to use.
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    afterUpdate (delta: number, time: number): void
    {
        //  Empty for parent classes to use.
        //  Called after this GameObject and all of its children have been updated.
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    preRenderGL <T extends IRenderPass> (renderPass: T): void
    {
        //  Called before this GameObject and all of its children have been rendered.
        //  If this Game Object won't render, this method is never called.
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
        //  If this Game Object won't render, this method is never called.
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    postRenderCanvas <T extends ICanvasRenderer> (renderer: T): void
    {
        //  Called after this GameObject and all of its children have been rendered.
        //  If this Game Object won't render, this method is never called.
    }

    set visible (value: boolean)
    {
        SetVisible(this.id, value);
    }

    get visible (): boolean
    {
        return GetVisible(this.id);
    }

    set visibleChildren (value: boolean)
    {
        SetVisibleChildren(this.id, value);
    }

    get visibleChildren (): boolean
    {
        return GetVisibleChildren(this.id);
    }

    /*
    set depth (value: number)
    {
        SetDepth(this.id, value);
    }

    get depth (): number
    {
        return GetDepth(this.id);
    }
    */

    hasParent (id?: number): boolean
    {
        const parentID = GetParentID(this.id);

        if (id)
        {
            return (parentID === id);
        }
        else
        {
            return (parentID > 0);
        }
    }

    getParent (): IGameObject | undefined
    {
        return GetParentGameObject(this.id);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getChildren <T extends IRenderPass> (renderPass?: T): IGameObject[]
    {
        return GetChildrenFromParentID(this.id);
    }

    getNumChildren (): number
    {
        return GetNumChildren(this.id);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onAddChild (childID: number): void
    {
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onUpdateChild (childID: number): void
    {
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onRemoveChild (childID: number): void
    {
    }

    //#ifdef GET_DISPLAY_DATA
    getDisplayData (): { id: number, parent: number, world: number, numChildren: number }
    {
        const id = this.id;

        const data = HierarchyComponent.data[id];

        return {
            id,
            parent: data[HIERARCHY.PARENT],
            world: data[HIERARCHY.WORLD],
            numChildren: data[HIERARCHY.NUM_CHILDREN]
        };
    }
    //#endif

    toString (): string
    {
        return `${this.type} id="${this.id}" name="${this.name}"`;
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

        //  TODO - Destroy process, remove from Cache, Tree, etc.

        // Emit(this, DestroyEvent, this);
        // this.events.clear();
        // this.events = null;

    }
}
