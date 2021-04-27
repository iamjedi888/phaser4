import {CalculateTotalRenderable} from "./CalculateTotalRenderable";
import {UpdateCachedLayers} from "./UpdateCachedLayers";
import {WorldDepthFirstSearch} from "./WorldDepthFirstSearch";
export function BuildRenderList(world) {
  const cachedLayers = [];
  const stack = [];
  const entries = WorldDepthFirstSearch(cachedLayers, world, stack);
  const renderData = world.renderData;
  if (cachedLayers.length > 0) {
    UpdateCachedLayers(cachedLayers, world.camera.dirtyRender);
  }
  entries.forEach((entry) => {
    if (entry.children.length > 0) {
      CalculateTotalRenderable(entry, renderData);
    } else {
      renderData.numRendered++;
      renderData.numRenderable++;
      if (entry.node.dirtyFrame >= renderData.gameFrame) {
        renderData.dirtyFrame++;
      }
    }
  });
  world.renderList = entries;
  if (world.forceRefresh) {
    renderData.dirtyFrame++;
    world.forceRefresh = false;
  }
}
