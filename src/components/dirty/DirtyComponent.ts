import { Types, defineComponent } from 'bitecs';

/**
 * TRANSFORM - This own entities local transform is dirty
 * CHILD_TRANSFORM - Has a child (of any depth) that has a dirty local transform
 * COLOR - This own entities color component is dirty
 * CHILD_COLOR - Has a child (of any depth) that has a dirty color component
 * CHILD_CACHE - This entity caches children (like a RenderLayer) and has a child (of any depth) that is dirty (transform or color)
 * WORLD_TRANSFORM - This own entities world transform is dirty
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

export const DirtyComponent = defineComponent({
    data: [ Types.ui8, 7 ]
});
