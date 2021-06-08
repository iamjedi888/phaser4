import { RenderStatsComponent } from "./RenderStatsComponent";
export function ResetRenderStats(id, gameFrame, scenes, worlds, transforms) {
  RenderStatsComponent.gameFrame[id] = gameFrame;
  RenderStatsComponent.numScenes[id] = scenes;
  RenderStatsComponent.numWorlds[id] = worlds;
  RenderStatsComponent.numGameObjects[id] = 0;
  RenderStatsComponent.numGameObjectsRendered[id] = 0;
  RenderStatsComponent.numDirtyWorldLists[id] = 0;
  RenderStatsComponent.numDirtyVertices[id] = 0;
  RenderStatsComponent.numDirtyLocalTransforms[id] = transforms;
  RenderStatsComponent.numDirtyWorldTransforms[id] = 0;
  RenderStatsComponent.numDirtyCameras[id] = 0;
}
