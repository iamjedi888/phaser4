import { Types, defineComponent } from 'bitecs';

export const HIERARCHY = {
    WORLD: 0,
    PARENT: 1,
    NEXT: 2,
    PREV: 3,
    FIRST: 4,
    LAST: 5,
    NUM_CHILDREN: 6,
    DEPTH: 7
};

//  world = The ID of the World entity the owner of this component belongs to
//  parent = The ID of the Parent entity. If it has no parent, will match the world ID
//  next = The ID of the next entity in the display list (horizontally, the next sibling)
//  prev = The ID of the previous entity in the display list (horizontally, the previous sibling)
//  first = The ID of the left-most (first) child entity of this parent
//  last = The ID of the right-most (last) child entity of this parent
//  numChildren = The number of direct descendants this entity has
//  depth = Reserved to allow for per-child depth sorting outside of the display list index

export const HierarchyComponent = defineComponent({
    data: [ Types.ui32, 8 ]
});
