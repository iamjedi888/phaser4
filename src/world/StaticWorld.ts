import * as WorldEvents from './events';

import { Query, defineQuery } from 'bitecs';

import { BaseWorld } from './BaseWorld';
import { Begin } from '../renderer/webgl1/renderpass/Begin';
import { BoundsIntersects } from '../components/bounds/BoundsIntersects';
import { ClearDirtyChild } from '../components/dirty/ClearDirtyChild';
import { ClearDirtyChildColor } from '../components/dirty/ClearDirtyChildColor';
import { ClearDirtyChildTransform } from '../components/dirty/ClearDirtyChildTransform';
import { ClearDirtyChildWorldTransform } from '../components/dirty/ClearDirtyChildWorldTransform';
import { ClearDirtyDisplayList } from '../components/dirty/ClearDirtyDisplayList';
import { ColorComponent } from '../components/color/ColorComponent';
import { Emit } from '../events/Emit';
import { GameInstance } from '../GameInstance';
import { GameObjectCache } from '../gameobjects/GameObjectCache';
import { GameObjectWorld } from '../GameObjectWorld';
import { GetFirstChildID } from '../components/hierarchy/GetFirstChildID';
import { GetNextSiblingID } from '../components/hierarchy/GetNextSiblingID';
import { GetParentID } from '../components/hierarchy/GetParentID';
import { GetRenderFrame } from '../components/transform/GetRenderFrame';
import { HasDirtyChildColor } from '../components/dirty/HasDirtyChildColor';
import { HasDirtyChildTransform } from '../components/dirty/HasDirtyChildTransform';
import { HasDirtyChildWorldTransform } from '../components/dirty/HasDirtyChildWorldTransform';
import { HasDirtyDisplayList } from '../components/dirty/HasDirtyDisplayList';
import { HasRenderableChildren } from '../components/permissions/HasRenderableChildren';
import { IBaseCamera } from '../camera/IBaseCamera';
import { IGameObject } from '../gameobjects/IGameObject';
import { IRenderPass } from '../renderer/webgl1/renderpass/IRenderPass';
import { IScene } from '../scenes/IScene';
import { IStaticCamera } from '../camera/IStaticCamera';
import { IStaticWorld } from './IStaticWorld';
import { MoveNextUpdatable } from '../components/hierarchy/MoveNextUpdatable';
import { PopColor } from '../renderer/webgl1/renderpass/PopColor';
import { QuadVertexComponent } from '../components/vertices/QuadVertexComponent';
import { RebuildWorldList } from './RebuildWorldList';
import { RebuildWorldTransforms } from './RebuildWorldTransforms';
import { RendererInstance } from '../renderer/RendererInstance';
import { SetColor } from '../renderer/webgl1/renderpass/SetColor';
import { SetRenderFrame } from '../components/transform/SetRenderFrame';
import { SetWillCacheChildren } from '../components/permissions/SetWillCacheChildren';
import { SetWillTransformChildren } from '../components/permissions/SetWillTransformChildren';
import { Transform2DComponent } from '../components/transform/Transform2DComponent';
import { UpdateLocalTransform } from '../components/transform/UpdateLocalTransform';
import { UpdateQuadColorSystem } from '../components/color/UpdateQuadColorSystem';
import { UpdateVertexPositionSystem } from '../components/vertices/UpdateVertexPositionSystem';
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

    declare camera: IStaticCamera;

    private colorQuery: Query;
    private transformQuery: Query;

    renderData: { gameFrame: number; dirtyLocal: number; dirtyWorld: number; dirtyQuad: number, dirtyColor: number; numChildren: number; rendered: number; renderMs: number; updated: number; updateMs: number; rebuiltWorld: boolean };

    constructor (scene: IScene)
    {
        super(scene);

        const tag = this.tag;

        this.colorQuery = defineQuery([ tag, ColorComponent, QuadVertexComponent ]);
        this.transformQuery = defineQuery([ tag, Transform2DComponent ]);

        const renderer = RendererInstance.get();

        // this.camera = new StaticCamera(renderer.width, renderer.height);
        this.camera = new WorldCamera(renderer.width, renderer.height);

        this.renderData = {
            gameFrame: 0,
            dirtyLocal: 0,
            dirtyWorld: 0,
            dirtyQuad: 0,
            dirtyColor: 0,
            numChildren: 0,
            rendered: 0,
            renderMs: 0,
            updated: 0,
            updateMs: 0,
            rebuiltWorld: false
        };

        SetWillTransformChildren(this.id, false);
        SetWillCacheChildren(this.id, false);
    }

    preRender (gameFrame: number): boolean
    {
        const id = this.id;

        const renderData = this.renderData;

        renderData.gameFrame = gameFrame;
        renderData.dirtyLocal = 0;
        renderData.dirtyWorld = 0;
        renderData.dirtyQuad = 0;
        renderData.dirtyColor = 0;
        renderData.rebuiltWorld = false;

        ClearDirtyChild(id);

        const entities = this.transformQuery(GameObjectWorld);

        if (HasDirtyChildTransform(id))
        {
            const dirtyLocal = UpdateLocalTransform(id, entities);

            ClearDirtyChildTransform(id);

            renderData.dirtyLocal = dirtyLocal;
        }

        if (HasDirtyChildWorldTransform(id))
        {
            const dirtyWorld = RebuildWorldTransforms(entities);

            const dirtyQuad = UpdateVertexPositionSystem(entities);

            ClearDirtyChildWorldTransform(id);

            renderData.dirtyWorld = dirtyWorld;
            renderData.dirtyQuad = dirtyQuad;
        }

        if (HasDirtyChildColor(id))
        {
            const dirtyColor = UpdateQuadColorSystem(this.colorQuery(GameObjectWorld));

            ClearDirtyChildColor(id);

            renderData.dirtyColor = dirtyColor;
        }

        if (HasDirtyDisplayList(id))
        {
            RebuildWorldList(this, id);

            ClearDirtyDisplayList(id);

            renderData.rebuiltWorld = true;
        }

        return true;
    }

    update (delta: number, time: number): void
    {
        Emit(this, WorldEvents.WorldBeforeUpdateEvent, this);

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

        Emit(this, WorldEvents.WorldUpdateEvent, this);
    }

    stackRender <T extends IRenderPass, C extends IBaseCamera> (renderPass: T, camera: C): void
    {
        const x = camera.getBoundsX();
        const y = camera.getBoundsY();
        const right = camera.getBoundsRight();
        const bottom = camera.getBoundsBottom();

        let total = 0;

        const gameFrame = GameInstance.getFrame();

        const stack: IGameObject[] = [];

        let gameObject: IGameObject;

        const worldID = this.id;

        const start = performance.now();

        let id = GetFirstChildID(worldID);

        while (id > 0)
        {
            const willRender = WillRender(id) && BoundsIntersects(id, x, y, right, bottom);
            const hasRenderableChildren = willRender && HasRenderableChildren(id);

            if (willRender)
            {
                gameObject = GameObjectCache.get(id);

                gameObject.renderGL(renderPass);

                if (hasRenderableChildren)
                {
                    stack.push(gameObject);
                }
                else
                {
                    gameObject.postRenderGL(renderPass);
                }

                total++;
            }

            if (hasRenderableChildren)
            {
                id = GetFirstChildID(id);
            }
            else
            {
                const sibling = GetNextSiblingID(id);

                if (sibling)
                {
                    //  Move to the next sibling
                    id = sibling;
                }
                else
                {
                    //  Move back up to the parent
                    const parent = GetParentID(id);

                    if (parent === worldID)
                    {
                        //  End of the line - pop the stack and quit
                        gameObject = stack.pop();

                        if (gameObject)
                        {
                            gameObject.postRenderGL(renderPass);
                        }

                        id = 0;
                    }
                    else
                    {
                        gameObject = stack.pop();

                        gameObject.postRenderGL(renderPass);

                        id = GetNextSiblingID(parent);
                    }
                }
            }
        }

        this.renderData.rendered = total;
        this.renderData.renderMs = performance.now() - start;
    }

    render <T extends IRenderPass, C extends IBaseCamera> (renderPass: T, camera: C): void
    {
        const x = camera.getBoundsX();
        const y = camera.getBoundsY();
        const right = camera.getBoundsRight();
        const bottom = camera.getBoundsBottom();

        let total = 0;

        const len = this.listLength;
        const list = this.renderList;

        const start = performance.now();

        for (let i = 0; i < len; i += 2)
        {
            const id = list[i];
            const type = list[i + 1];
            const entry = GameObjectCache.get(id);

            if (type === 1)
            {
                //  We've already rendered this Game Object, so skip bounds checking
                entry.postRenderGL(renderPass);
            }
            else if (BoundsIntersects(id, x, y, right, bottom))
            {
                entry.renderGL(renderPass);

                if (type === 2)
                {
                    entry.postRenderGL(renderPass);
                }

                total++;
            }
        }

        this.renderData.rendered = total;
        this.renderData.renderMs = performance.now() - start;
    }

    renderGL <T extends IRenderPass> (renderPass: T): void
    {
        SetColor(renderPass, this.color);

        Emit(this, WorldEvents.WorldRenderEvent, this);

        const camera = this.camera;

        Begin(renderPass, camera);

        // this.render(renderPass, camera);

        this.stackRender(renderPass, camera);

        PopColor(renderPass, this.color);

        //#ifdef RENDER_STATS
        this.renderData.numChildren = this.getNumChildren();
        window['renderStats'] = this.renderData;
        //#endif

        Emit(this, WorldEvents.WorldPostRenderEvent, renderPass, this);
    }
}
