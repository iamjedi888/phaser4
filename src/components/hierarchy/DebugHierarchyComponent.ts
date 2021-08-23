import { HIERARCHY, HierarchyComponent } from './HierarchyComponent';

export function DebugHierarchyComponent (id: number): void
{
    const data = HierarchyComponent.data[id];

    const index = data[HIERARCHY.INDEX];
    const parent = data[HIERARCHY.PARENT];
    const world = data[HIERARCHY.WORLD];
    const next = data[HIERARCHY.NEXT];
    const prev = data[HIERARCHY.PREV];

    console.group(`Entity ID: ${id}`);
    console.log(`index: ${index} - parent: ${parent} - world: ${world}`);
    console.log(`> next: ${next}      < prev: ${prev}`);

    const kids = data[HIERARCHY.NUM_CHILDREN];
    const first = data[HIERARCHY.FIRST];
    const last = data[HIERARCHY.LAST];

    if (kids > 0)
    {
        console.log(`first: ${first}`);
        console.log(`last: ${last}`);
        console.log(`numChildren: ${kids}`);
    }

    console.groupEnd();
}
