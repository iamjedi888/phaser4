import { GameObjectTree } from '../../gameobjects/GameObjectTree';
import { GetParentID } from './GetParentID';

export function GetSiblingIDs (childID: number): number[]
{
    const parentID = GetParentID(childID);

    return GameObjectTree.get(parentID);
}
