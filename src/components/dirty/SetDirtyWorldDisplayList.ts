import { DirtyComponent } from './DirtyComponent';
import { HierarchyComponent } from '../hierarchy/HierarchyComponent';

export function SetDirtyWorldDisplayList (id: number): void
{
    const worldID = HierarchyComponent.worldID[id];

    DirtyComponent.displayList[worldID] = 1;
}
