import { DirtyComponent } from './DirtyComponent';
import { GameObjectWorld } from '../../GameObjectWorld';
import { addComponent } from 'bitecs';

export function AddDirtyComponent (id: number): void
{
    addComponent(GameObjectWorld, DirtyComponent, id);

    DirtyComponent.frame[id] = 0;
    DirtyComponent.transform[id] = 1;
    DirtyComponent.update[id] = 1;
    DirtyComponent.childCache[id] = 0;
    DirtyComponent.postRender[id] = 0;
    DirtyComponent.vertexColors[id] = 1;
    DirtyComponent.bounds[id] = 1;
    DirtyComponent.texture[id] = 0;
    DirtyComponent.textureFrame[id] = 0;
    DirtyComponent.alpha[id] = 0;
    DirtyComponent.child[id] = 0;
}
