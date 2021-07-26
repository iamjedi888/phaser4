import { GameObjectTree } from '../../gameobjects/GameObjectTree';
import { SetIndex } from './SetIndex';

export function UpdateChildIndexes (parentID: number): void
{
    const children = GameObjectTree.get(parentID);

    for (let i = 0; i < children.length; i++)
    {
        SetIndex(children[i], i);
    }
}
