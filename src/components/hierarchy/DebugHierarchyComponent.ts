import { HierarchyComponent } from './HierarchyComponent';

export function DebugHierarchyComponent (id: number): void
{
    const hc = HierarchyComponent;

    console.group(`Entity ID: ${id}`);
    console.log(`world: ${hc.world[id]}`);
    console.log(`parent: ${hc.parent[id]}`);
    console.log(`index: ${hc.index[id]}`);
    console.log(`next: ${hc.next[id]}`);
    console.log(`prev: ${hc.prev[id]}`);
    console.log(`first: ${hc.first[id]}`);
    console.log(`last: ${hc.last[id]}`);
    console.log(`numChildren: ${hc.numChildren[id]}`);
    console.groupEnd();
}
