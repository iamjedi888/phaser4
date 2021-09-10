import * as WorldEvents from './events';

import { GetProcessTotal, GetRenderChildTotal, GetRenderList, RenderNode, ResetRenderChildTotal } from './RenderNode';

import { BaseWorld } from './BaseWorld';
import { Begin } from '../renderer/webgl1/renderpass/Begin';
import { ClearDirtyChildColor } from '../components/dirty/ClearDirtyChildColor';
import { ClearDirtyChildTransform } from '../components/dirty/ClearDirtyChildTransform';
import { CreateWorldRenderData } from './CreateWorldRenderData';
import { Emit } from '../events/Emit';
import { GameObjectCache } from '../gameobjects/GameObjectCache';
import { GetFirstChildID } from '../components/hierarchy/GetFirstChildID';
import { GetNextSiblingID } from '../components/hierarchy/GetNextSiblingID';
import { HasCustomDisplayList } from '../components/permissions/HasCustomDisplayList';
import { HasDirtyChildColor } from '../components/dirty/HasDirtyChildColor';
import { HasDirtyChildTransform } from '../components/dirty/HasDirtyChildTransform';
import { IGameObject } from '../gameobjects/IGameObject';
import { IRenderPass } from '../renderer/webgl1/renderpass/IRenderPass';
import { IScene } from '../scenes/IScene';
import { IStaticWorld } from './IStaticWorld';
import { IWorldRenderData } from './IWorldRenderData';
import { MoveNextUpdatable } from '../components/hierarchy/MoveNextUpdatable';
import { PopColor } from '../renderer/webgl1/renderpass/PopColor';
import { ProcessNode } from './ProcessNode';
import { RendererInstance } from '../renderer/RendererInstance';
import { ResetWorldRenderData } from './ResetWorldRenderData';
import { SetColor } from '../renderer/webgl1/renderpass/SetColor';
import { SetWillCacheChildren } from '../components/permissions/SetWillCacheChildren';
import { SetWillTransformChildren } from '../components/permissions/SetWillTransformChildren';
import { UpdateNode } from './UpdateNode';
import { WillRender } from '../components/permissions/WillRender';
import { WillUpdate } from '../components/permissions/WillUpdate';
import { WorldCamera } from '../camera/WorldCamera';

//  A Static World is designed specifically to have a bounds of a fixed size
//  and a camera that doesn't move at all (no scrolling, rotation, etc)
//  Because it has a fixed size, there is no camera culling enabled.
//  Games that use this kind of world include Pacman, Bejeweled and 2048.

export class StaticWorld extends BaseWorld implements IStaticWorld
{
    readonly type: string = 'StaticWorld';

    // declare camera: IStaticCamera;
    declare camera: WorldCamera;

    renderData: IWorldRenderData;

    stack: Uint32Array;

    constructor (scene: IScene)
    {
        super(scene);

        const renderer = RendererInstance.get();

        // this.camera = new StaticCamera(renderer.width, renderer.height);
        this.camera = new WorldCamera(renderer.width, renderer.height);

        this.renderData = CreateWorldRenderData();

        SetWillTransformChildren(this.id, false);
        SetWillCacheChildren(this.id, false);

        //  The stack can be up to 256 layers deep
        this.stack = new Uint32Array(256);
    }

    preRender (gameFrame: number): boolean
    {
        const start = performance.now();

        const id = this.id;

        const renderData = this.renderData;

        ResetWorldRenderData(renderData, gameFrame);

        const camera = this.camera;
        const cameraUpdated = camera.updateBounds();

        const checkColor = HasDirtyChildColor(id);
        const checkTransform = HasDirtyChildTransform(id) || cameraUpdated;

        if (!checkColor && !checkTransform)
        {
            //  Nothing needs updating, so let's get out of here
            return false;
        }

        const cx = camera.getBoundsX();
        const cy = camera.getBoundsY();
        const cright = camera.getBoundsRight();
        const cbottom = camera.getBoundsBottom();

        const stack = this.stack;

        stack[0] = id;

        let stackIndex = 1;
        let parentNode = id;
        let isDisplayList = false;
        let node = GetFirstChildID(id);

        stackBlock:
        {
            while (stackIndex > 0)
            {
                UpdateNode(node, parentNode, checkColor, checkTransform, cx, cy, cright, cbottom, cameraUpdated, isDisplayList, renderData);

                //  Dive as deep as we can go, adding all parents to the stack for _this branch_
                //  If the parent isn't dirty and has no dirty children, go no further down this branch

                while (ProcessNode(node, cameraUpdated, isDisplayList))
                {
                    stack[stackIndex++] = node;

                    parentNode = node;
                    isDisplayList = HasCustomDisplayList(node);

                    node = GetFirstChildID(node);

                    UpdateNode(node, parentNode, checkColor, checkTransform, cx, cy, cright, cbottom, cameraUpdated, isDisplayList, renderData);
                }

                //  We're at the bottom of the branch
                //  We know 'node' doesn't have any children, but the next sibling might
                //  Move horizontally through the siblings, until we hit one with kids, or the end.

                let next = GetNextSiblingID(node);

                let climb = true;

                while (next && climb)
                {
                    if (ProcessNode(next, cameraUpdated, isDisplayList))
                    {
                        //  The 'next' sibling has a child, so we're going deeper
                        climb = false;
                        break;
                    }
                    else
                    {
                        UpdateNode(next, parentNode, checkColor, checkTransform, cx, cy, cright, cbottom, cameraUpdated, isDisplayList, renderData);

                        next = GetNextSiblingID(next);
                    }
                }

                //  The moment we get here, we need to treat it like a whole new branch
                //  We have either run out of siblings, or found one with children

                if (climb)
                {
                    //  No children and no more siblings, so let's climb
                    //  Go back up the stack until we find a node with a sibling

                    while (next === 0)
                    {
                        node = stack[--stackIndex];

                        if (!node)
                        {
                            break stackBlock;
                        }

                        next = GetNextSiblingID(node);
                    }

                    parentNode = stack[stackIndex - 1];
                    isDisplayList = HasCustomDisplayList(parentNode);
                }

                //  'next' now contains the sibling of the stack parent, set it to 'node'
                node = next;
            }
        }

        ClearDirtyChildColor(id);
        ClearDirtyChildTransform(id);

        this.getNumChildren();

        renderData.preRenderMs = performance.now() - start;

        return true;
    }

    update (delta: number, time: number): void
    {
        Emit(this, WorldEvents.WorldBeforeUpdateEvent, delta, time);

        const start = performance.now();

        let next = GetFirstChildID(this.id);

        let total = 0;

        while (next > 0)
        {
            if (WillUpdate(next))
            {
                GameObjectCache.get(next).update(delta, time);

                total++;
            }

            next = MoveNextUpdatable(next);
        }

        this.renderData.updated = total;
        this.renderData.updateMs = performance.now() - start;

        Emit(this, WorldEvents.WorldUpdateEvent, delta, time);
    }

    renderGL <T extends IRenderPass> (renderPass: T): void
    {
        SetColor(renderPass, this.color);

        Emit(this, WorldEvents.WorldRenderEvent, this);

        const camera = this.camera;
        const renderData = this.renderData;

        const start = performance.now();

        Begin(renderPass, camera);

        ResetRenderChildTotal();

        let id = GetFirstChildID(this.id);

        while (id > 0)
        {
            if (WillRender(id))
            {
                RenderNode(renderPass, id);
            }

            id = GetNextSiblingID(id);
        }

        camera.isDirty = false;

        PopColor(renderPass, this.color);

        //#ifdef RENDER_STATS
        renderData.renderMs = performance.now() - start;
        renderData.numChildren = this.getNumChildren();
        renderData.fps = this.scene.game.time.fps;
        renderData.delta = this.scene.game.time.delta;
        renderData.rendered = GetRenderChildTotal();
        renderData.processed = GetProcessTotal();
        // renderData.renderList = GetRenderList();

        this.scene.game.renderStats = renderData;
        //#endif

        Emit(this, WorldEvents.WorldPostRenderEvent, renderPass, this);
    }

    getRenderList (): IGameObject[]
    {
        return GetRenderList();
    }
}
