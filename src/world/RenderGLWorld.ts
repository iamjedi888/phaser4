import * as WorldEvents from './events';

import { GetProcessTotal, GetRenderChildTotal, RenderGLNode, ResetRenderChildTotal } from './RenderGLNode';

import { Begin } from '../renderer/webgl1/renderpass/Begin';
import { Emit } from '../events/Emit';
import { GetFirstChildID } from '../components/hierarchy/GetFirstChildID';
import { GetNextSiblingID } from '../components/hierarchy/GetNextSiblingID';
import { IBaseWorld } from './IBaseWorld';
import { IRenderPass } from '../renderer/webgl1/renderpass/IRenderPass';
import { PopColor } from '../renderer/webgl1/renderpass/PopColor';
import { SetColor } from '../renderer/webgl1/renderpass/SetColor';
import { WillRender } from '../components/permissions/WillRender';

export function RenderGLWorld <T extends IBaseWorld, P extends IRenderPass> (world: T, renderPass: P): void
{
    SetColor(renderPass, world.color);

    Emit(world, WorldEvents.WorldRenderEvent, world);

    const camera = world.camera;
    const renderData = world.renderData;

    const start = performance.now();

    Begin(renderPass, camera);

    ResetRenderChildTotal();

    let id = GetFirstChildID(world.id);

    while (id > 0)
    {
        if (WillRender(id))
        {
            RenderGLNode(renderPass, id);
        }

        id = GetNextSiblingID(id);
    }

    camera.isDirty = false;

    PopColor(renderPass, world.color);

    //#ifdef RENDER_STATS
    renderData.renderMs = performance.now() - start;
    renderData.numChildren = world.getNumChildren();
    renderData.fps = world.scene.game.time.fps;
    renderData.delta = world.scene.game.time.delta;
    renderData.rendered = GetRenderChildTotal();
    renderData.processed = GetProcessTotal();
    // renderData.renderList = GetRenderList();

    world.scene.game.renderStats = renderData;
    //#endif

    Emit(world, WorldEvents.WorldPostRenderEvent, renderPass, world);
}
