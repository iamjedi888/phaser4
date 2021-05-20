import { DirtyComponent } from './DirtyComponent';

export function HasDirtyPostRender (id: number): boolean
{
    return Boolean(DirtyComponent.postRender[id]);
}
