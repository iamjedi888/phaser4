import { DirtyComponent } from './DirtyComponent';

export function SetDirtyTextureFrame (id: number): void
{
    DirtyComponent.textureFrame[id] = 1;
}
