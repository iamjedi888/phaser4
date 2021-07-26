import { GetChildIndex } from './GetChildIndex';
import { GetSiblingIDs } from '../components/hierarchy/GetSiblingIDs';
import { IGameObject } from '../gameobjects/IGameObject';
import { SetDirtyWorldDisplayList } from '../components/dirty/SetDirtyWorldDisplayList';
import { UpdateIndexes } from '../components/hierarchy/UpdateIndexes';

export function MoveChildTo <T extends IGameObject> (child: T, index: number): T
{
    const childID = child.id;

    const currentIndex = GetChildIndex(child);

    const children = GetSiblingIDs(childID);

    if (currentIndex === -1 || index < 0 || index >= children.length)
    {
        throw new Error('Index out of bounds');
    }

    if (currentIndex !== index)
    {
        //  Remove
        children.splice(currentIndex, 1);

        //  Add in new location
        children.splice(index, 0, childID);

        UpdateIndexes(childID);

        SetDirtyWorldDisplayList(childID);
    }

    return child;
}
