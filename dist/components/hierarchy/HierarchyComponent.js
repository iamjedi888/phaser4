import { Types, defineComponent } from "bitecs";
export const HIERARCHY = {
  WORLD: 0,
  PARENT: 1,
  NEXT: 2,
  PREV: 3,
  FIRST: 4,
  LAST: 5,
  NUM_CHILDREN: 6,
  DEPTH: 7
};
export const HierarchyComponent = defineComponent({
  data: [Types.ui32, 8]
});
