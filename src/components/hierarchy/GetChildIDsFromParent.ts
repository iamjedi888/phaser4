import { GameObjectTree } from '../../gameobjects/GameObjectTree';
import { IGameObject } from '../../gameobjects/IGameObject';

export function GetChildIDsFromParent <T extends IGameObject> (parent: T): number[]
{
    return GameObjectTree.get(parent.id);
}
