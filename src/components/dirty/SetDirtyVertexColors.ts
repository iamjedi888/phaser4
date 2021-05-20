import { DirtyComponent } from './DirtyComponent';
import { IGameObject } from '../../gameobjects/IGameObject';

export function SetDirtyVertexColors (gameObject: IGameObject): void
{
    DirtyComponent.vertexColors[gameObject.id] = 1;
}
