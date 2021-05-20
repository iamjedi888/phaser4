import { DirtyComponent } from './DirtyComponent';

export function HasDirtyTexture (id: number): boolean
{
    return Boolean(DirtyComponent.texture[id]);
}
