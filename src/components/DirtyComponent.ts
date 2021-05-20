import { Types, defineComponent } from 'bitecs';

const Dirty = defineComponent({
    frame: Types.ui8,
    transform: Types.ui8,
    update: Types.ui8,
    childCache: Types.ui8,
    postRender: Types.ui8,
    colors: Types.ui8,
    bounds: Types.ui8,
    texture: Types.ui8,
    textureFrame: Types.ui8,
    alpha: Types.ui8,
    child: Types.ui8
});

export const DirtyComponent = Dirty;
