import { Types, defineComponent } from 'bitecs';

//  world = The ID of the World entity the owner of this component belongs to
//  parent = The ID of the Parent entity. If it has no parent, will match the world ID
//  index = The position of this entity compared to its siblings, i.e. index 0 is at the back, index 1 above that, etc
//  next = The ID of the next entity in the display list (horizontally, the next sibling)
//  prev = The ID of the previous entity in the display list (horizontally, the previous sibling)
//  first = The ID of the left-most (first) child entity of this parent
//  last = The ID of the right-most (last) child entity of this parent
//  numChildren = The number of direct descendants this entity has
//  depth = Reserved to allow for per-child depth sorting outside of the display list index

const Hierarchy = defineComponent({
    world: Types.ui32,
    parent: Types.ui32,
    index: Types.ui32,
    next: Types.ui32,
    prev: Types.ui32,
    first: Types.ui32,
    last: Types.ui32,
    numChildren: Types.ui32,
    depth: Types.ui32
});

export const HierarchyComponent = Hierarchy;
