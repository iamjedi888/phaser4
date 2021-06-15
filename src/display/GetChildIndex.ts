import { GameObjectTree } from '../gameobjects/GameObjectTree';
import { GetParentID } from '../components/hierarchy';
import { IGameObject } from '../gameobjects/IGameObject';

export function GetChildIndex <T extends IGameObject> (child: T): number
{
    const childID = child.id;

    return GameObjectTree.get(GetParentID(childID)).indexOf(childID);
}
