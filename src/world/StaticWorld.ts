import * as WorldEvents from './events';

import { GetRenderChildTotal, GetRenderList, RenderChild, ResetRenderChildTotal } from './RenderChild';
import { Query, defineQuery } from 'bitecs';

import { BaseWorld } from './BaseWorld';
import { Begin } from '../renderer/webgl1/renderpass/Begin';
import { BranchSearch } from '../components/hierarchy/BranchSearch';
import { ClearDirtyChildColor } from '../components/dirty/ClearDirtyChildColor';
import { ClearDirtyChildTransform } from '../components/dirty/ClearDirtyChildTransform';
import { ClearDirtyColor } from '../components/dirty/ClearDirtyColor';
import { ClearDirtyTransform } from '../components/dirty/ClearDirtyTransform';
import { ColorComponent } from '../components/color/ColorComponent';
import { Emit } from '../events/Emit';
import { GameObjectCache } from '../gameobjects/GameObjectCache';
import { GetFirstChildID } from '../components/hierarchy/GetFirstChildID';
import { GetNextSiblingID } from '../components/hierarchy/GetNextSiblingID';
import { GetParentID } from '../components/hierarchy/GetParentID';
import { HasChildren } from '../components/hierarchy/HasChildren';
import { HasDirtyChildColor } from '../components/dirty/HasDirtyChildColor';
import { HasDirtyChildTransform } from '../components/dirty/HasDirtyChildTransform';
import { HasDirtyColor } from '../components/dirty/HasDirtyColor';
import { HasDirtyTransform } from '../components/dirty/HasDirtyTransform';
import { IGameObject } from '../gameobjects/IGameObject';
import { IRenderPass } from '../renderer/webgl1/renderpass/IRenderPass';
import { IScene } from '../scenes/IScene';
import { IStaticWorld } from './IStaticWorld';
import { MoveNextUpdatable } from '../components/hierarchy/MoveNextUpdatable';
import { PopColor } from '../renderer/webgl1/renderpass/PopColor';
import { QuadVertexComponent } from '../components/vertices/QuadVertexComponent';
import { RendererInstance } from '../renderer/RendererInstance';
import { SetColor } from '../renderer/webgl1/renderpass/SetColor';
import { SetInViewFromBounds } from '../components/transform/SetInViewFromBounds';
import { SetQuadColor } from '../components/vertices/SetQuadColor';
import { SetWillCacheChildren } from '../components/permissions/SetWillCacheChildren';
import { SetWillTransformChildren } from '../components/permissions/SetWillTransformChildren';
import { Transform2DComponent } from '../components/transform/Transform2DComponent';
import { UpdateTransforms } from '../components/transform/UpdateTransforms';
import { UpdateWorldTransformSingle } from '../components/transform/UpdateWorldTransformSingle';
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

    // private colorQuery: Query;
    // private transformQuery: Query;

    // renderList: Uint32Array;

    renderData: { gameFrame: number; dirtyLocal: number; dirtyWorld: number; dirtyQuad: number, dirtyColor: number; dirtyView: number, numChildren: number; rendered: number; renderMs: number; updated: number; updateMs: number, fps: number, delta: number, renderList: IGameObject[] };

    constructor (scene: IScene)
    {
        super(scene);

        // const tag = this.tag;

        // this.colorQuery = defineQuery([ tag, ColorComponent, QuadVertexComponent ]);
        // this.transformQuery = defineQuery([ tag, Transform2DComponent ]);

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
            updated: 0,
            updateMs: 0,
            fps: 0,
            delta: 0,
            renderList: []
        };

        SetWillTransformChildren(this.id, false);
        SetWillCacheChildren(this.id, false);
    }

    /*
    processChild (id: number, checkColor: boolean, checkTransform: boolean, cx: number, cy: number, cright: number, cbottom: number, cameraUpdated: boolean): void
    {
        if (checkColor && HasDirtyColor(id))
        {
            const r = ColorComponent.r[id] / 255;
            const g = ColorComponent.g[id] / 255;
            const b = ColorComponent.b[id] / 255;
            const a = ColorComponent.a[id];

            SetQuadColor(id, r, g, b, a);

            ClearDirtyColor(id);

            // dirtyColor++;
        }

        if (checkTransform)
        {
            const parentID = GetParentID(id);

            if (HasDirtyTransform(id))
            {
                UpdateTransforms(id, parentID, cx, cy, cright, cbottom, cameraUpdated);

                ClearDirtyTransform(id);

                // dirtyLocal++;
            }
            else if (HasDirtyParentTransform(parentID))
            {
                UpdateWorldTransformSingle(id, parentID, cx, cy, cright, cbottom, cameraUpdated);

                // dirtyWorld++;
            }
            else if (cameraUpdated)
            {
                SetInViewFromBounds(id, cx, cy, cright, cbottom);

                // dirtyView++;
            }
        }
    }
    */

    updateChildColor (id: number): void
    {
        if (HasDirtyColor(id))
        {
            const r = ColorComponent.r[id] / 255;
            const g = ColorComponent.g[id] / 255;
            const b = ColorComponent.b[id] / 255;
            const a = ColorComponent.a[id];

            SetQuadColor(id, r, g, b, a);

            ClearDirtyColor(id);

            // dirtyColor++;
        }
    }

    updateChildTransform (id: number, cx: number, cy: number, cright: number, cbottom: number, cameraUpdated: boolean): void
    {
        const parentID = GetParentID(id);

        if (HasDirtyTransform(id))
        {
            UpdateTransforms(id, cx, cy, cright, cbottom, cameraUpdated);

            ClearDirtyTransform(id);

            // dirtyLocal++;
        }
        else if (HasDirtyParentTransform(parentID))
        {
            UpdateWorldTransformSingle(id, parentID, cx, cy, cright, cbottom, cameraUpdated);

            // dirtyWorld++;
        }
        else if (cameraUpdated)
        {
            SetInViewFromBounds(id, cx, cy, cright, cbottom);

            // dirtyView++;
        }
    }

    preRender (gameFrame: number): boolean
    {
        const id = this.id;

        const renderData = this.renderData;

        renderData.gameFrame = gameFrame;
        renderData.rendered = 0;

        // ClearDirtyChild(id);

        const camera = this.camera;
        const cameraUpdated = camera.updateBounds();

        let dirtyLocal = 0;
        let dirtyWorld = 0;
        let dirtyQuad = 0;
        let dirtyColor = 0;
        let dirtyView = 0;

        const cx = camera.getBoundsX();
        const cy = camera.getBoundsY();
        const cright = camera.getBoundsRight();
        const cbottom = camera.getBoundsBottom();

        const hasDirtyDisplayList = this.updateDisplayList;
        const checkColor = HasDirtyChildColor(id);
        const checkTransform = true;
        // const checkTransform = HasDirtyChildTransform(id) || HasDirtyChildWorldTransform(id) || cameraUpdated;

        /*
        const process = (id: number): void =>
        {
            const parentID = GetParentID(id);

            if (checkColor && HasDirtyColor(id))
            {
                const r = ColorComponent.r[id] / 255;
                const g = ColorComponent.g[id] / 255;
                const b = ColorComponent.b[id] / 255;
                const a = ColorComponent.a[id];

                SetQuadColor(id, r, g, b, a);

                ClearDirtyColor(id);

                dirtyColor++;
            }

            if (checkTransform)
            {
                if (HasDirtyTransform(id))
                {
                    UpdateTransforms(id, parentID, cx, cy, cright, cbottom, cameraUpdated);

                    ClearDirtyTransform(id);

                    dirtyLocal++;
                }
                else if (HasDirtyParentTransform(parentID))
                {
                    UpdateWorldTransformSingle(id, parentID, cx, cy, cright, cbottom, cameraUpdated);

                    dirtyWorld++;
                }
                else if (cameraUpdated)
                {
                    SetInViewFromBounds(id, gameFrame, cx, cy, cright, cbottom);

                    dirtyView++;
                }
            }
            else if (cameraUpdated)
            {
                SetInViewFromBounds(id, gameFrame, cx, cy, cright, cbottom);

                dirtyView++;
            }
        };
        */

        // BranchSearch(id, process);

        //  Inlined BranchSearch:

        //  TODO:

        //  If parent doesn't have dirty child color or transform, we don't need
        //  to run process on _any_ of its children (as long as they don't also have children)

        const stack: number[] = [ id ];

        let node = GetFirstChildID(id);

        stackBlock:
        {
            while (stack.length > 0)
            {
                this.updateChildColor(node);
                this.updateChildTransform(node, cx, cy, cright, cbottom, cameraUpdated);

                // this.processChild(node, checkColor, checkTransform, cx, cy, cright, cbottom, cameraUpdated);

                //  Dive as deep as we can go, adding all parents to the stack for _this branch_
                //  If the parent isn't dirty, we need go no further down the branch

                while (HasChildren(node) && HasDirtyChildTransform(node))
                {
                    stack.push(node);

                    node = GetFirstChildID(node);

                    if (checkColor)
                    {
                        this.updateChildColor(node);
                    }

                    if (checkTransform)
                    {
                        this.updateChildTransform(node, cx, cy, cright, cbottom, cameraUpdated);
                    }

                    // this.processChild(node, checkColor, checkTransform, cx, cy, cright, cbottom, cameraUpdated);
                }

                //  We're at the bottom of the branch
                //  Move horizontally through the siblings, until we hit one with kids

                let next = GetNextSiblingID(node);

                let climb = true;

                if (next)
                {
                    let hasChildren = false;

                    do
                    {
                        hasChildren = HasChildren(next) && HasDirtyChildTransform(next);

                        if (hasChildren)
                        {
                            //  We're going deeper
                            climb = false;
                            node = next;
                            break;
                        }
                        else
                        {
                            if (checkColor)
                            {
                                this.updateChildColor(next);
                            }

                            if (checkTransform)
                            {
                                this.updateChildTransform(next, cx, cy, cright, cbottom, cameraUpdated);
                            }

                            // this.processChild(next, checkColor, checkTransform, cx, cy, cright, cbottom, cameraUpdated);

                            next = GetNextSiblingID(next);
                        }

                    } while (next && !hasChildren);
                }

                //  The moment we get here, we need to treat it like a whole new branch
                //  We have either run out of siblings, or found one with children

                if (climb)
                {
                    //  No children and no more siblings, so let's climb
                    //  Go back up the stack until we find a node with a sibling

                    do
                    {
                        node = stack.pop();

                        if (!node)
                        {
                            break stackBlock;
                        }

                        next = GetNextSiblingID(node);

                    } while (next === 0);
                }

                // if (!node)
                // {
                //     break stackBlock;
                // }

                //  'next' now contains the sibling of the stack parent, set it to 'node'
                node = next;
            }
        }

        dirtyQuad = dirtyLocal + dirtyWorld;

        ClearDirtyChildColor(id);
        ClearDirtyChildTransform(id);

        this.getNumChildren();

        renderData.dirtyLocal = dirtyLocal;
        renderData.dirtyWorld = dirtyWorld;
        renderData.dirtyQuad = dirtyQuad;
        renderData.dirtyColor = dirtyColor;
        renderData.dirtyView = dirtyView;
        renderData.rendered = GetRenderChildTotal();

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
