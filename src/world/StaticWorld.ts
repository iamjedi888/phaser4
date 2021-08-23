import * as WorldEvents from './events';

import { HasRenderableChildren, SetWillTransformChildren, WillUpdate } from '../components/permissions';
import { Query, defineQuery } from 'bitecs';

import { BaseWorld } from './BaseWorld';
import { Begin } from '../renderer/webgl1/renderpass/Begin';
import { BoundsIntersects } from '../components/bounds/BoundsIntersects';
import { ClearDirtyChild } from '../components/dirty/ClearDirtyChild';
import { ClearDirtyColor } from '../components/dirty/ClearDirtyColor';
import { ClearDirtyDisplayList } from '../components/dirty/ClearDirtyDisplayList';
import { ColorComponent } from '../components/color/ColorComponent';
import { Emit } from '../events/Emit';
import { GameObjectCache } from '../gameobjects/GameObjectCache';
import { GameObjectTree } from '../gameobjects/GameObjectTree';
import { GameObjectWorld } from '../GameObjectWorld';
import { GetFirstChildID } from '../components/hierarchy/GetFirstChildID';
import { GetNextSiblingID } from '../components/hierarchy/GetNextSiblingID';
import { GetNumChildren } from '../components/hierarchy/GetNumChildren';
import { HasDirtyChild } from '../components/dirty/HasDirtyChild';
import { HasDirtyColor } from '../components/dirty/HasDirtyColor';
import { HasDirtyDisplayList } from '../components/dirty/HasDirtyDisplayList';
import { IBaseCamera } from '../camera/IBaseCamera';
import { IGameObject } from '../gameobjects/IGameObject';
import { IRenderPass } from '../renderer/webgl1/renderpass/IRenderPass';
import { IScene } from '../scenes/IScene';
import { IStaticCamera } from '../camera/IStaticCamera';
import { IStaticWorld } from './IStaticWorld';
import { MoveNext } from '../components/hierarchy/MoveNext';
import { MoveNextRenderable } from '../components/hierarchy/MoveNextRenderable';
import { MoveNextUpdatable } from '../components/hierarchy/MoveNextUpdatable';
import { PopColor } from '../renderer/webgl1/renderpass/PopColor';
import { QuadVertexComponent } from '../components/vertices';
import { RebuildWorldList } from './RebuildWorldList';
import { RebuildWorldTransforms } from './RebuildWorldTransforms';
import { RendererInstance } from '../renderer/RendererInstance';
import { SetColor } from '../renderer/webgl1/renderpass/SetColor';
import { StaticCamera } from '../camera/StaticCamera';
import { Transform2DComponent } from '../components/transform/Transform2DComponent';
import { UpdateLocalTransform } from '../components/transform/UpdateLocalTransform';
import { UpdateLocalTransformList } from '../components/transform/UpdateLocalTransformList';
import { UpdateQuadColorSystem } from '../components/color/UpdateQuadColorSystem';
import { UpdateVertexPositionSystem } from '../components/vertices/UpdateVertexPositionSystem';
import { WillRender } from '../components/permissions/WillRender';
import { WillRenderChildren } from '../components/permissions/WillRenderChildren';
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

    private rendered: number;

    list: IGameObject[] = [];
    renderList2: number[] = [];

    renderData: { gameFrame: number; dirtyLocal: number; dirtyVertices: number; numChildren: number; numRendered: number; numRenderable: number; rebuiltList: boolean; rebuiltWorld: boolean; updated: number, updateMs: number };

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
            dirtyVertices: 0,
            numChildren: 0,
            numRendered: 0,
            numRenderable: 0,
            rebuiltList: false,
            rebuiltWorld: false,
            updated: 0,
            updateMs: 0
        };

        SetWillTransformChildren(this.id, false);
    }

    //  1) Reset World Data
    //  2) Get World entities
    //  3) Update Local Transforms
    //  4) Update World Transforms
    //  5) Update Vertex Positions
    //  6) Update Vertex Colors

    preRender (gameFrame: number): boolean
    {
        const id = this.id;

        const renderData = this.renderData;

        renderData.gameFrame = gameFrame;
        renderData.rebuiltList = false;
        renderData.rebuiltWorld = false;

        ClearDirtyChild(id);

        const entities = this.transformQuery(GameObjectWorld);

        const totalDirty = UpdateLocalTransformList(entities);

        renderData.dirtyLocal = totalDirty;

        /*
        const dirtyDisplayList = HasDirtyDisplayList(id);

        if (dirtyDisplayList || totalDirty > 0)
        {
            //  TODO - This should only run over the branches that are dirty, not the whole World.

            //  This will update the Transform2DComponent.world values.
            // RebuildWorldTransforms(this);
            // RebuildWorldTransforms(this, id, false);

            RenderDataComponent.rebuiltWorld[id] = 1;

            this.getNumChildren();

            ClearDirtyDisplayList(id);

            // isDirty = true;
        }
        */

        //  TODO - Only run if we've a dirty child
        //  TODO - This uses the same query as ULT! So don't re-run this, use the same array.
        // UpdateVertexPositionSystem(id, GameObjectWorld, this.transformQuery);



        /*
        if (dirtyDisplayList)
        {
            this.listLength = 0;

            RebuildWorldList(this, id);

            RenderDataComponent.numChildren[id] = this.getNumChildren();
            RenderDataComponent.numRenderable[id] = this.listLength / 4;
            RenderDataComponent.rebuiltList[id] = 1;

            ClearDirtyDisplayList(id);

            // isDirty = true;
        }
        */

        //  TODO - Need to use a different permission component, as Worlds have color (see SetDirtyColor)
        if (HasDirtyColor(id))
        {
            UpdateQuadColorSystem(id, GameObjectWorld, this.colorQuery);

            ClearDirtyColor(id);
        }

        //  By this point we've got a fully rebuilt World, where all dirty Game Objects have been
        //  refreshed and had their coordinates moved to their quad vertices.

        //  We've also got a complete local render list, in display order, that can be processed further
        //  before rendering (i.e. spatial tree, bounds, etc)

        return true;
    }

    update (delta: number, time: number): void
    {
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
    }

    listRender <T extends IRenderPass, C extends IBaseCamera> (renderPass: T, camera: C): void
    {
        const x = camera.getBoundsX();
        const y = camera.getBoundsY();
        const right = camera.getBoundsRight();
        const bottom = camera.getBoundsBottom();

        let next = GetFirstChildID(this.id);

        while (next > 0)
        {
            if (WillRender(next))
            {
                const intersects = BoundsIntersects(next, x, y, right, bottom);

                if (intersects)
                {
                    const gameObject = GameObjectCache.get(next);

                    this.rendered++;

                    gameObject.renderGL(renderPass);
                    gameObject.postRenderGL(renderPass);
                }
            }

            next = MoveNextRenderable(next);
        }
    }

    renderGL <T extends IRenderPass> (renderPass: T): void
    {
        SetColor(renderPass, this.color);

        Emit(this, WorldEvents.WorldRenderEvent, this);

        const camera = this.camera;

        Begin(renderPass, camera);

        this.rendered = 0;

        this.listRender(renderPass, camera);

        PopColor(renderPass, this.color);

        //#ifdef RENDER_STATS
        this.renderData.numChildren = this.getNumChildren();
        this.renderData.numRendered = this.rendered;
        window['renderStats'] = this.renderData;
        //#endif

        Emit(this, WorldEvents.WorldPostRenderEvent, renderPass, this);
    }
}
