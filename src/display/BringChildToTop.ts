import { GetChildIndex } from './GetChildIndex';
import { GetSiblingIDs } from '../components/hierarchy/GetSiblingIDs';
import { IGameObject } from '../gameobjects/IGameObject';
import { SetDirtyWorldDisplayList } from '../components/dirty/SetDirtyWorldDisplayList';
import { UpdateIndexes } from '../components/hierarchy/UpdateIndexes';

export function BringChildToTop <T extends IGameObject> (child: T): T
{
    const childID = child.id;

    const currentIndex = GetChildIndex(child);

    const children = GetSiblingIDs(childID);

    if (currentIndex !== -1 && currentIndex < children.length)
    {
        children.splice(currentIndex, 1);
        children.push(childID);

        UpdateIndexes(childID);

        SetDirtyWorldDisplayList(childID);
    }

    return child;
}
