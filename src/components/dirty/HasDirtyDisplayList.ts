import { DirtyComponent } from './DirtyComponent';

export function HasDirtyDisplayList (id: number): boolean
{
    return Boolean(DirtyComponent.displayList[id]);
}
