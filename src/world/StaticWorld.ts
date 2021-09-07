import * as WorldEvents from './events';

import { GetRenderChildTotal, GetRenderList, RenderChild, ResetRenderChildTotal } from './RenderChild';

import { BaseWorld } from './BaseWorld';
import { Begin } from '../renderer/webgl1/renderpass/Begin';
import { ClearDirtyChildColor } from '../components/dirty/ClearDirtyChildColor';
import { ClearDirtyChildTransform } from '../components/dirty/ClearDirtyChildTransform';
import { ClearDirtyColor } from '../components/dirty/ClearDirtyColor';
import { ClearDirtyTransform } from '../components/dirty/ClearDirtyTransform';
import { ColorComponent } from '../components/color/ColorComponent';
import { Emit } from '../events/Emit';
import { GameObjectCache } from '../gameobjects/GameObjectCache';
import { GetDepth } from '../components/hierarchy/GetDepth';
import { GetFirstChildID } from '../components/hierarchy/GetFirstChildID';
import { GetNextSiblingID } from '../components/hierarchy/GetNextSiblingID';
import { GetParentID } from '../components/hierarchy/GetParentID';
import { HasChildren } from '../components/hierarchy/HasChildren';
import { HasDirtyChildColor } from '../components/dirty/HasDirtyChildColor';
import { HasDirtyChildTransform } from '../components/dirty/HasDirtyChildTransform';
import { HasDirtyColor } from '../components/dirty/HasDirtyColor';
import { HasDirtyTransform } from '../components/dirty/HasDirtyTransform';
import { HasDirtyWorldTransform } from '../components/dirty/HasDirtyWorldTransform';
import { IGameObject } from '../gameobjects/IGameObject';
import { IRenderPass } from '../renderer/webgl1/renderpass/IRenderPass';
import { IScene } from '../scenes/IScene';
import { IStaticWorld } from './IStaticWorld';
import { MoveNextUpdatable } from '../components/hierarchy/MoveNextUpdatable';
import { PopColor } from '../renderer/webgl1/renderpass/PopColor';
import { RendererInstance } from '../renderer/RendererInstance';
import { SetColor } from '../renderer/webgl1/renderpass/SetColor';
import { SetInViewFromBounds } from '../components/transform/SetInViewFromBounds';
import { SetQuadColor } from '../components/vertices/SetQuadColor';
import { SetWillCacheChildren } from '../components/permissions/SetWillCacheChildren';
import { SetWillTransformChildren } from '../components/permissions/SetWillTransformChildren';
import { UpdateTransforms } from '../components/transform/UpdateTransforms';
import { UpdateWorldTransformSingle } from '../components/transform/UpdateWorldTransformSingle';
import { WillRender } from '../components/permissions/WillRender';
import { WillUpdate } from '../components/permissions/WillUpdate';
import { WillUpdateTransform } from '../components/dirty/WillUpdateTransform';
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

    // renderData: { gameFrame: number; dirtyLocal: number; dirtyWorld: number; dirtyQuad: number, dirtyColor: number; dirtyView: number, numChildren: number; rendered: number; renderMs: number; preRenderMs: number, updated: number; updateMs: number, fps: number, delta: number, renderList: IGameObject[] };
    renderData: { gameFrame: number; dirtyLocal: number; dirtyWorld: number; dirtyQuad: number, dirtyColor: number; dirtyView: number, numChildren: number; rendered: number; renderMs: number; preRenderMs: number, updated: number; updateMs: number, fps: number, delta: number };

    stack: Uint32Array;

    constructor (scene: IScene)
    {
        super(scene);

        const renderer = RendererInstance.get();

        // this.camera = new StaticCamera(renderer.width, renderer.height);
        this.camera = new WorldCamera(renderer.width, renderer.height);

        this.renderData = {
            gameFrame: 0,
            dirtyLocal: 0,
            dirtyWorld: 0,
            dirtyQuad: 0,
            dirtyColor: 0,
            dirtyView: 0,
            numChildren: 0,
            rendered: 0,
            renderMs: 0,
            preRenderMs: 0,
            updated: 0,
            updateMs: 0,
            fps: 0,
            delta: 0
        };

        SetWillTransformChildren(this.id, false);
        SetWillCacheChildren(this.id, false);

        //  The stack can be up to 32 layers deep
        this.stack = new Uint32Array(32);
    }

    updateChild (id: number, parentID: number, checkColor: boolean, checkTransform: boolean, cx: number, cy: number, cright: number, cbottom: number, cameraUpdated: boolean): void
    {
        const renderData = this.renderData;

        renderData.dirtyQuad++;

        if (checkColor && HasDirtyColor(id))
        {
            const r = ColorComponent.r[id] / 255;
            const g = ColorComponent.g[id] / 255;
            const b = ColorComponent.b[id] / 255;
            const a = ColorComponent.a[id];

            SetQuadColor(id, r, g, b, a);

            ClearDirtyColor(id);

            renderData.dirtyColor++;
        }

        if (checkTransform)
        {
            if (HasDirtyTransform(id))
            {
                UpdateTransforms(id, cx, cy, cright, cbottom, cameraUpdated);

                ClearDirtyTransform(id);

                renderData.dirtyLocal++;
            }
            else if (HasDirtyWorldTransform(parentID))
            {
                UpdateWorldTransformSingle(id, parentID, cx, cy, cright, cbottom, cameraUpdated);

                renderData.dirtyWorld++;
            }
            else if (cameraUpdated)
            {
                SetInViewFromBounds(id, cx, cy, cright, cbottom);

                renderData.dirtyView++;
            }
        }
    }

    processNode (node: number, cameraUpdated: boolean): boolean
    {
        return (HasChildren(node) && (cameraUpdated || WillUpdateTransform(node)));
    }

    //#ifdef RENDER_STATS
    resetRenderData (gameFrame: number): void
    {
        const renderData = this.renderData;

        renderData.gameFrame = gameFrame;
        renderData.rendered = 0;
        renderData.dirtyColor = 0;
        renderData.dirtyLocal = 0;
        renderData.dirtyView = 0;
        renderData.dirtyWorld = 0;
        renderData.dirtyQuad = 0;
    }
    //#endif

    preRender (gameFrame: number): boolean
    {
        const start = performance.now();

        const id = this.id;

        const renderData = this.renderData;

        this.resetRenderData(gameFrame);

        const camera = this.camera;
        const cameraUpdated = camera.updateBounds();

        const checkColor = HasDirtyChildColor(id);
        const checkTransform = HasDirtyChildTransform(id) || cameraUpdated;

        if (!checkColor && !checkTransform)
        {
            //  Nothing needs updating, so let's get out of here
            renderData.preRenderMs = 0;

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
        let node = GetFirstChildID(id);

        stackBlock:
        {
            while (stackIndex > 0)
            {
                this.updateChild(node, parentNode, checkColor, checkTransform, cx, cy, cright, cbottom, cameraUpdated);

                //  Dive as deep as we can go, adding all parents to the stack for _this branch_
                //  If the parent isn't dirty and has no dirty children, go no further down this branch

                while (this.processNode(node, cameraUpdated))
                {
                    stack[stackIndex++] = node;

                    parentNode = node;

                    node = GetFirstChildID(node);

                    this.updateChild(node, parentNode, checkColor, checkTransform, cx, cy, cright, cbottom, cameraUpdated);
                }

                //  We're at the bottom of the branch
                //  We know 'node' doesn't have any children, but the next sibling might
                //  Move horizontally through the siblings, until we hit one with kids, or the end.

                let next = GetNextSiblingID(node);

                let climb = true;

                while (next && climb)
                {
                    if (this.processNode(next, cameraUpdated))
                    {
                        //  The 'next' sibling has a child, so we're going deeper
                        climb = false;
                        break;
                    }
                    else
                    {
                        this.updateChild(next, parentNode, checkColor, checkTransform, cx, cy, cright, cbottom, cameraUpdated);

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
                }

                //  'next' now contains the sibling of the stack parent, set it to 'node'
                node = next;
            }
        }

        ClearDirtyChildColor(id);
        ClearDirtyChildTransform(id);

        this.getNumChildren();

        // renderData.dirtyQuad = renderData.dirtyLocal + renderData.dirtyWorld;

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
                RenderChild(renderPass, id);
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
