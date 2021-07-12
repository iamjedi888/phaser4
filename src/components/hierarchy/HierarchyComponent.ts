import { Types, defineComponent } from 'bitecs';

//  worldDepth max is 65535

const Hierarchy = defineComponent({
    worldID: Types.ui32,
    parentID: Types.ui32,
    numChildren: Types.ui32,
    depth: Types.ui32,
    worldDepth: Types.ui16
});

export const HierarchyComponent = Hierarchy;
