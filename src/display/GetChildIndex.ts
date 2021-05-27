import { GameObjectTree } from '../gameobjects/GameObjectTree';
import { IGameObject } from '../gameobjects/IGameObject';

export function GetChildIndex (parent: IGameObject, child: IGameObject): number
{
    return GameObjectTree.get(parent.id).indexOf(child.id);
}
