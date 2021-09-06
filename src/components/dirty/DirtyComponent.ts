import { Types, defineComponent } from 'bitecs';

export const DIRTY = {
    CHILD: 0,
    CHILD_CACHE: 1,
    CHILD_TRANSFORM: 2,
    CHILD_WORLD_TRANSFORM: 3,
    CHILD_COLOR: 4,
    DISPLAY_LIST: 5,
    COLOR: 6,
    PARENT_TRANSFORM: 7
};

export const DirtyComponent = defineComponent({
    data: [ Types.ui8, 8 ]
});
