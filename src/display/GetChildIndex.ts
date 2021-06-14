import { GameObjectTree } from '../gameobjects/GameObjectTree';
import { IGameObject } from '../gameobjects/IGameObject';

export function GetChildIndex <P extends IGameObject, C extends IGameObject> (parent: P, child: C): number
{
    return GameObjectTree.get(parent.id).indexOf(child.id);
}
