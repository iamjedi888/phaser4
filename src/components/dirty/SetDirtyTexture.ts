import { DirtyComponent } from './DirtyComponent';

export function SetDirtyTexture (id: number): void
{
    DirtyComponent.texture[id] = 1;
}
