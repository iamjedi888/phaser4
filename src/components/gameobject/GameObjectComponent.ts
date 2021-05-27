import { Types, defineComponent } from 'bitecs';

const GameObject = defineComponent({
    worldID: Types.ui32,
    parentID: Types.ui32,
    numChildren: Types.ui32,
    depth: Types.ui32
});

export const GameObjectComponent = GameObject;
