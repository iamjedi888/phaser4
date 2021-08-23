import { Types, defineComponent } from 'bitecs';

export const DIRTY = {
    CHILD: 0,
    CHILD_CACHE: 1,
    DISPLAY_LIST: 2,
    CHILD_TRANSFORM: 3,
    CHILD_WORLD_TRANSFORM: 4,
    CHILD_COLOR: 5
};

export const DirtyComponent = defineComponent({
    data: [ Types.ui8, 6 ]
});
