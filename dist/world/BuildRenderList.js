import { CalculateTotalRenderable } from "./CalculateTotalRenderable";
import { IsDirtyFrame } from "../components/dirty";
import { RenderDataComponent } from "./RenderDataComponent";
import { UpdateCachedLayers } from "./UpdateCachedLayers";
import { WorldDepthFirstSearch } from "./WorldDepthFirstSearch";
export function BuildRenderList(world) {
  const worldID = world.id;
  const cachedLayers = [];
  const stack = [];
  const entries = WorldDepthFirstSearch(cachedLayers, world, stack);
  const renderData = world.renderData;
  if (cachedLayers.length > 0) {
    UpdateCachedLayers(cachedLayers, world.camera.dirtyRender);
  }
  const gameFrame = RenderDataComponent.gameFrame[worldID];
  entries.forEach((entry) => {
    if (entry.children.length > 0) {
      CalculateTotalRenderable(entry, renderData);
    } else {
      RenderDataComponent.numRendered[worldID]++;
      RenderDataComponent.numRenderable[worldID]++;
      if (IsDirtyFrame(entry.node.id, gameFrame)) {
        RenderDataComponent.dirtyFrame[worldID]++;
      }
    }
  });
  world.renderList = entries;
  if (world.forceRefresh) {
    RenderDataComponent.dirtyFrame[worldID]++;
    world.forceRefresh = false;
  }
}
