import * as WorldEvents from './events';

import { Query, defineQuery } from 'bitecs';

import { AddToRenderList } from './AddToRenderList';
import { BaseWorld } from './BaseWorld';
import { Begin } from '../renderer/webgl1/renderpass/Begin';
import { BoundsIntersects } from '../components/bounds/BoundsIntersects';
import { ClearDirtyDisplayList } from '../components/dirty/ClearDirtyDisplayList';
import { ColorComponent } from '../components/color/ColorComponent';
import { Emit } from '../events/Emit';
import { GameObjectCache } from '../gameobjects/GameObjectCache';
import { GameObjectTree } from '../gameobjects/GameObjectTree';
import { GameObjectWorld } from '../GameObjectWorld';
import { HasDirtyDisplayList } from '../components/dirty/HasDirtyDisplayList';
import { IRenderPass } from '../renderer/webgl1/renderpass/IRenderPass';
import { IScene } from '../scenes/IScene';
import { PopColor } from '../renderer/webgl1/renderpass/PopColor';
import { QuadVertexComponent } from '../components/vertices/QuadVertexComponent';
import { RenderDataComponent } from './RenderDataComponent';
import { RendererInstance } from '../renderer/RendererInstance';
import { ResetWorldRenderData } from './ResetWorldRenderData';
import { SetColor } from '../renderer/webgl1/renderpass/SetColor';
import { Transform2DComponent } from '../components/transform/Transform2DComponent';
import { Transform2DSystem } from '../components/transform/Transform2DSystem';
import { UpdateQuadColorSystem } from '../components/color';
import { UpdateVertexPositionSystem } from '../components/vertices/UpdateVertexPositionSystem';
import { WillRender } from '../components/permissions/WillRender';
import { WorldCamera } from '../camera/WorldCamera';

export class FlatWorld extends BaseWorld
{
    readonly type: string = 'FlatWorld';

    declare camera: WorldCamera;

    private colorQuery: Query;
    private transformQuery: Query;

    constructor (scene: IScene)
    {
        super(scene);

        const tag = this.tag;

        this.colorQuery = defineQuery([ tag, ColorComponent, QuadVertexComponent ]);
        this.transformQuery = defineQuery([ tag, Transform2DComponent ]);

        const renderer = RendererInstance.get();

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

        let isDirty = Transform2DSystem(id, GameObjectWorld, this.transformQuery);

        UpdateVertexPositionSystem(id, GameObjectWorld, this.transformQuery);

        if (HasDirtyDisplayList(id))
        {
            this.listLength = 0;

            const children = GameObjectTree.get(id);

            for (let i = 0; i < children.length; i++)
            {
                const nodeID = children[i];

                if (WillRender(nodeID))
                {
                    AddToRenderList(this, nodeID, 2);
                }
            }

            RenderDataComponent.numChildren[id] = this.getNumChildren();
            RenderDataComponent.numRenderable[id] = this.listLength / 2;
            RenderDataComponent.rebuiltList[id] = 1;

            ClearDirtyDisplayList(id);

            isDirty = true;
        }

        UpdateQuadColorSystem(id, GameObjectWorld, this.colorQuery);

        //  By this point we've got a fully rebuilt World, where all dirty Game Objects have been
        //  refreshed and had their coordinates moved to their quad vertices.

        //  We've also got a complete local render list, in display order, that can be processed further
        //  before rendering (i.e. spatial tree, bounds, etc)

        return isDirty;
    }

    renderGL <T extends IRenderPass> (renderPass: T): void
    {
        SetColor(renderPass, this.color);

        Emit(this, WorldEvents.WorldRenderEvent, this);

        const camera = this.camera;

        Begin(renderPass, camera);

        const list = this.renderList;

        const [ x, y, right, bottom ] = camera.getBounds();

        let rendered = 0;

        for (let i = 0; i < this.listLength; i += 2)
        {
            const eid = list[i];

            //  Do a bounds check against the camera
            if (BoundsIntersects(eid, x, y, right, bottom))
            {
                const entry = GameObjectCache.get(eid);

                entry.renderGL(renderPass);
                entry.postRenderGL(renderPass);

                rendered++;
            }
        }

        PopColor(renderPass, this.color);

        const id = this.id;

        window['renderStats'] = {
            gameFrame: RenderDataComponent.gameFrame[id],
            numChildren: RenderDataComponent.numChildren[id],
            numRendererd: rendered,
            numRenderable: RenderDataComponent.numRenderable[id],
            dirtyLocal: RenderDataComponent.dirtyLocal[id],
            dirtyVertices: RenderDataComponent.dirtyVertices[id],
            rebuiltList: RenderDataComponent.rebuiltList[id],
            rebuiltWorld: RenderDataComponent.rebuiltWorld[id]
        };

        Emit(this, WorldEvents.WorldPostRenderEvent, renderPass, this);
    }
}
