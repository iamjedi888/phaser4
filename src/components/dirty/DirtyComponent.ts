import { Types, defineComponent } from 'bitecs';

/**
 * TRANSFORM - Has a dirty local transform
 * CHILD_TRANSFORM - Has a child (of any depth) that has a dirty local transform
 * COLOR - Has a dirty color component
 * CHILD_COLOR - Has a child (of any depth) that has a dirty color component
 * CHILD_CACHE - This entity caches children (like a RenderLayer) and has a child (of any depth) that is dirty (transform or color)
 * DISPLAY_LIST - If the Game Object has a custom display list (like SpatialGridLayer) this indicates if it's dirty, or not.
 */

export const DIRTY = {
    TRANSFORM: 0,
    CHILD_TRANSFORM: 1,
    COLOR: 2,
    CHILD_COLOR: 3,
    CHILD_CACHE: 4,
    WORLD_TRANSFORM: 5,
    DISPLAY_LIST: 6
};

//  Old values:
// CHILD: 0,
// CHILD_CACHE: 1,
// CHILD_TRANSFORM: 2,
// CHILD_WORLD_TRANSFORM: 3,
// CHILD_COLOR: 4,
// DISPLAY_LIST: 5,
// COLOR: 6,
// PARENT_TRANSFORM: 7

export const DirtyComponent = defineComponent({
    data: [ Types.ui8, 7 ]
});
