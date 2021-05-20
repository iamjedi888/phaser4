import { DirtyComponent } from './DirtyComponent';
import { IGameObject } from '../../gameobjects/IGameObject';

export function HasDirtyVertexColors (gameObject: IGameObject): boolean
{
    return Boolean(DirtyComponent.vertexColors[gameObject.id]);
}
