import { Types, defineComponent } from "bitecs";
const Hierarchy = defineComponent({
  worldID: Types.ui32,
  parentID: Types.ui32,
  numChildren: Types.ui32,
  depth: Types.ui32
});
export const HierarchyComponent = Hierarchy;
