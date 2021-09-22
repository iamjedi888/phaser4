import { Types, defineComponent } from "bitecs";
export const DIRTY = {
  TRANSFORM: 0,
  CHILD_TRANSFORM: 1,
  COLOR: 2,
  CHILD_COLOR: 3,
  CHILD_CACHE: 4,
  WORLD_TRANSFORM: 5,
  DISPLAY_LIST: 6,
  SELF: 7
};
export const DirtyComponent = defineComponent({
  data: [Types.ui8, 8]
});
