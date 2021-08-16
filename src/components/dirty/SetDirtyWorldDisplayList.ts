import { DirtyComponent } from './DirtyComponent';
import { HierarchyComponent } from '../hierarchy/HierarchyComponent';

export function SetDirtyWorldDisplayList (id: number): void
{
    const worldID = HierarchyComponent.world[id];

    DirtyComponent.displayList[worldID] = 1;
}
