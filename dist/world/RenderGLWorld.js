import * as WorldEvents from "./events";
import { GetProcessTotal, GetRenderChildTotal, RenderGLNode, ResetRenderChildTotal } from "./RenderGLNode";
import { Begin } from "../renderer/webgl1/renderpass/Begin";
import { Emit } from "../events/Emit";
import { GetFirstChildID } from "../components/hierarchy/GetFirstChildID";
import { GetNextSiblingID } from "../components/hierarchy/GetNextSiblingID";
import { PopColor } from "../renderer/webgl1/renderpass/PopColor";
import { SetColor } from "../renderer/webgl1/renderpass/SetColor";
import { WillRender } from "../components/permissions/WillRender";
export function RenderGLWorld(world, renderPass) {
  SetColor(renderPass, world.color);
  Emit(world, WorldEvents.WorldRenderEvent, renderPass, world);
  const camera = world.camera;
  const renderData = world.renderData;
  const start = performance.now();
  Begin(renderPass, camera);
  ResetRenderChildTotal();
  let id = GetFirstChildID(world.id);
  while (id > 0) {
    if (WillRender(id)) {
      RenderGLNode(renderPass, id);
    }
    id = GetNextSiblingID(id);
  }
  PopColor(renderPass, world.color);
  renderData.renderMs = performance.now() - start;
  renderData.numChildren = world.getNumChildren();
  renderData.rendered = GetRenderChildTotal();
  renderData.processed = GetProcessTotal();
  const gameStats = world.scene.game.renderStats;
  gameStats.rendered += renderData.rendered;
  gameStats.dirtyColor += renderData.dirtyColor;
  gameStats.dirtyLocal += renderData.dirtyLocal;
  gameStats.dirtyView += renderData.dirtyView;
  gameStats.dirtyWorld += renderData.dirtyWorld;
  gameStats.dirtyQuad += renderData.dirtyQuad;
  gameStats.processed += renderData.processed;
  gameStats.renderMs += renderData.renderMs;
  gameStats.numChildren = renderData.numChildren;
  gameStats.preRenderMs += renderData.preRenderMs;
  gameStats.updated += renderData.updated;
  gameStats.updateMs += renderData.updateMs;
  camera.postRender();
  Emit(world, WorldEvents.WorldPostRenderEvent, renderPass, world);
}
