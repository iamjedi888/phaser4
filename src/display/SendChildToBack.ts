import { GetChildIndex } from './GetChildIndex';
import { GetSiblingIDs } from '../components/hierarchy';
import { IGameObject } from '../gameobjects/IGameObject';
import { SetDirtyWorldDisplayList } from '../components/dirty';

export function SendChildToBack <T extends IGameObject> (child: T): T
{
    const childID = child.id;

    const currentIndex = GetChildIndex(child);

    const children = GetSiblingIDs(childID);

    if (currentIndex > 0)
    {
        children.splice(currentIndex, 1);
        children.unshift(childID);

        SetDirtyWorldDisplayList(childID);
    }

    return child;
}
