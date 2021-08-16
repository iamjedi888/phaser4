import { HierarchyComponent } from './HierarchyComponent';

export function DebugHierarchyComponent (id: number): void
{
    const hc = HierarchyComponent;

    console.group(`Entity ID: ${id}`);
    console.log(`index: ${hc.index[id]} - parent: ${hc.parent[id]} - world: ${hc.world[id]}`);
    console.log(`> next: ${hc.next[id]}      < prev: ${hc.prev[id]}`);

    if (hc.numChildren[id] > 0)
    {
        console.log(`first: ${hc.first[id]}`);
        console.log(`last: ${hc.last[id]}`);
        console.log(`numChildren: ${hc.numChildren[id]}`);
    }

    console.groupEnd();
}
