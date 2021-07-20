import { GameObjectTree } from '../../gameobjects';
import { GetParentID } from './GetParentID';
import { SetIndex } from './SetIndex';

export function UpdateIndexes (id: number): void
{
    const parentID = GetParentID(id);

    const children = GameObjectTree.get(parentID);

    for (let i = 0; i < children.length; i++)
    {
        SetIndex(children[i], i);
    }
}
