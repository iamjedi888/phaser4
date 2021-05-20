import { DirtyComponent } from './DirtyComponent';

export function HasDirtyTextureFrame (id: number): boolean
{
    return Boolean(DirtyComponent.textureFrame[id]);
}
