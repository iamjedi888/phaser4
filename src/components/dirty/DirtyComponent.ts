import { Types, defineComponent } from 'bitecs';

const Dirty = defineComponent({
    child: Types.ui8,
    childCache: Types.ui8,
    displayList: Types.ui8,
    transform: Types.ui8,
    worldTransform: Types.ui8,
    color: Types.ui8
});

export const DirtyComponent = Dirty;
