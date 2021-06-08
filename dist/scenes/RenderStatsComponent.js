import { Types, defineComponent } from "bitecs";
const RenderStats = defineComponent({
  gameFrame: Types.ui32,
  numScenes: Types.ui8,
  numWorlds: Types.ui8,
  numGameObjects: Types.ui32,
  numGameObjectsRendered: Types.ui32,
  numDirtyLocalTransforms: Types.ui32,
  numDirtyWorldTransforms: Types.ui32,
  numDirtyVertices: Types.ui32,
  numDirtyWorldLists: Types.ui8,
  numDirtyCameras: Types.ui32
});
export const RenderStatsComponent = RenderStats;
