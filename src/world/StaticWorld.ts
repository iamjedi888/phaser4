import * as WorldEvents from './events';

import { Query, defineQuery } from 'bitecs';

import { BaseWorld } from './BaseWorld';
import { Begin } from '../renderer/webgl1/renderpass/Begin';
import { BoundsIntersects } from '../components/bounds/BoundsIntersects';
import { ClearDirtyChild } from '../components/dirty/ClearDirtyChild';
import { ClearDirtyDisplayList } from '../components/dirty/ClearDirtyDisplayList';
import { ColorComponent } from '../components/color/ColorComponent';
import { Emit } from '../events/Emit';
import { GameObjectCache } from '../gameobjects/GameObjectCache';
import { GameObjectTree } from '../gameobjects/GameObjectTree';
import { GameObjectWorld } from '../GameObjectWorld';
import { GetNumChildren } from '../components/hierarchy/GetNumChildren';
import { HasDirtyChild } from '../components/dirty/HasDirtyChild';
import { HasDirtyDisplayList } from '../components/dirty/HasDirtyDisplayList';
import { HasRenderableChildren } from '../components/permissions';
import { IRenderPass } from '../renderer/webgl1/renderpass/IRenderPass';
import { IScene } from '../scenes/IScene';
import { IStaticCamera } from '../camera/IStaticCamera';
import { IStaticWorld } from './IStaticWorld';
import { PopColor } from '../renderer/webgl1/renderpass/PopColor';
import { QuadVertexComponent } from '../components/vertices';
import { RebuildWorldList } from './RebuildWorldList';
import { RebuildWorldTransforms } from './RebuildWorldTransforms';
import { RenderDataComponent } from './RenderDataComponent';
import { RendererInstance } from '../renderer/RendererInstance';
import { ResetWorldRenderData } from './ResetWorldRenderData';
import { SetColor } from '../renderer/webgl1/renderpass/SetColor';
import { StaticCamera } from '../camera/StaticCamera';
import { Transform2DComponent } from '../components/transform/Transform2DComponent';
import { UpdateLocalTransform } from '../components/transform/UpdateLocalTransform';
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

    constructor (scene: IScene)
    {
        super(scene);

        const tag = this.tag;

        this.colorQuery = defineQuery([ tag, ColorComponent, QuadVertexComponent ]);
        this.transformQuery = defineQuery([ tag, Transform2DComponent ]);

        const renderer = RendererInstance.get();

        // this.camera = new StaticCamera(renderer.width, renderer.height);
        this.camera = new WorldCamera(renderer.width, renderer.height);
    }

    //  We should update the display list and world transforms regardless of
    //  if this World will render or not (i.e. all children are outside viewport)
    preRender (gameFrame: number): boolean
    {
        const id = this.id;

        ResetWorldRenderData(id, gameFrame);

        RenderDataComponent.rebuiltList[id] = 0;
        RenderDataComponent.rebuiltWorld[id] = 0;

        ClearDirtyChild(id);

        const totalDirty = UpdateLocalTransform(id, GameObjectWorld, this.transformQuery);

        RenderDataComponent.dirtyLocal[id] = totalDirty;

        const dirtyDisplayList = HasDirtyDisplayList(id);

        if (dirtyDisplayList || totalDirty > 0)
        {
            //  TODO - This should only run over the branches that are dirty, not the whole World.

            //  This will update the Transform2DComponent.world values.
            RebuildWorldTransforms(this, id, false);

            RenderDataComponent.rebuiltWorld[id] = 1;

            this.getNumChildren();

            ClearDirtyDisplayList(id);

            // isDirty = true;
        }

        UpdateVertexPositionSystem(id, GameObjectWorld, this.transformQuery);

        /*
        if (dirtyDisplayList)
        {
            this.listLength = 0;

            RebuildWorldList(this, id, 0);

            RenderDataComponent.numChildren[id] = this.getNumChildren();
            RenderDataComponent.numRenderable[id] = this.listLength / 4;
            RenderDataComponent.rebuiltList[id] = 1;

            ClearDirtyDisplayList(id);

            isDirty = true;
        }
        */

        UpdateQuadColorSystem(id, GameObjectWorld, this.colorQuery);

        //  By this point we've got a fully rebuilt World, where all dirty Game Objects have been
        //  refreshed and had their coordinates moved to their quad vertices.

        //  We've also got a complete local render list, in display order, that can be processed further
        //  before rendering (i.e. spatial tree, bounds, etc)

        return true;
    }

    runRender <T extends IRenderPass> (renderPass: T, entry: number, x: number, y: number, right: number, bottom: number): void
    {
        if (WillRender(entry))
        {
            const intersects = (entry !== this.id) && BoundsIntersects(entry, x, y, right, bottom);

            let gameObject;

            if (intersects)
            {
                gameObject = GameObjectCache.get(entry);
            }

            if (HasRenderableChildren(entry))
            {
                if (intersects)
                {
                    this.rendered++;

                    gameObject.renderGL(renderPass);
                }

                const children = GameObjectTree.get(entry);

                for (let i = 0; i < children.length; i++)
                {
                    const childID = children[i];

                    if (WillRender(childID))
                    {
                        this.runRender(renderPass, childID, x, y, right, bottom);
                    }
                }

                if (intersects)
                {
                    gameObject.postRenderGL(renderPass);
                }
            }
            else if (intersects)
            {
                this.rendered++;

                gameObject.renderGL(renderPass);
                gameObject.postRenderGL(renderPass);
            }
        }
    }

    renderGL <T extends IRenderPass> (renderPass: T): void
    {
        SetColor(renderPass, this.color);

        Emit(this, WorldEvents.WorldRenderEvent, this);

        const camera = this.camera;

        Begin(renderPass, camera);

        const [ x, y, right, bottom ] = camera.getBounds();

        this.rendered = 0;

        this.runRender(renderPass, this.id, x, y, right, bottom);

        // const children = GameObjectTree.get(this.id);






        /*
        const list = this.renderList;

        let rendered = 0;

        for (let i = 0; i < this.listLength; i += 2)
        {
            const eid = list[i];
            const type = list[i + 1];
            const entry = GameObjectCache.get(eid);

            if (type === 1)
            {
                //  We've already rendered this Game Object, so skip bounds checking
                entry.postRenderGL(renderPass);
            }
            else if (BoundsIntersects(eid, x, y, right, bottom))
            {
                entry.renderGL(renderPass);

                if (type === 2)
                {
                    entry.postRenderGL(renderPass);
                }

                rendered++;
            }
        }
        */

        PopColor(renderPass, this.color);

        const id = this.id;

        //#ifdef RENDER_STATS
        window['renderStats'] = {
            gameFrame: RenderDataComponent.gameFrame[id],
            numChildren: this.getNumChildren(),
            numRendererd: this.rendered,
            numRenderable: RenderDataComponent.numRenderable[id],
            dirtyLocal: RenderDataComponent.dirtyLocal[id],
            dirtyVertices: RenderDataComponent.dirtyVertices[id],
            rebuiltList: RenderDataComponent.rebuiltList[id],
            rebuiltWorld: RenderDataComponent.rebuiltWorld[id]
        };
        //#endif

        Emit(this, WorldEvents.WorldPostRenderEvent, renderPass, this);
    }
}
