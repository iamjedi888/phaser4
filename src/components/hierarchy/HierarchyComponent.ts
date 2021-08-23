import { Types, defineComponent } from 'bitecs';

export const HIERARCHY = {
    WORLD: 0,
    PARENT: 1,
    INDEX: 2,
    NEXT: 3,
    PREV: 4,
    FIRST: 5,
    LAST: 6,
    NUM_CHILDREN: 7,
    DEPTH: 8
};

//  world = The ID of the World entity the owner of this component belongs to
//  parent = The ID of the Parent entity. If it has no parent, will match the world ID
//  index = The position of this entity compared to its siblings, i.e. index 0 is at the back, index 1 above that, etc
//  next = The ID of the next entity in the display list (horizontally, the next sibling)
//  prev = The ID of the previous entity in the display list (horizontally, the previous sibling)
//  first = The ID of the left-most (first) child entity of this parent
//  last = The ID of the right-most (last) child entity of this parent
//  numChildren = The number of direct descendants this entity has
//  depth = Reserved to allow for per-child depth sorting outside of the display list index

export const HierarchyComponent = defineComponent({
    data: [ Types.ui32, 9 ]
});
