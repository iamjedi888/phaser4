import { GetChildIndex } from './GetChildIndex';
import { GetSiblingIDs } from '../components/hierarchy';
import { IGameObject } from '../gameobjects/IGameObject';
import { SetDirtyWorldDisplayList } from '../components/dirty';

export function MoveChildUp <T extends IGameObject> (child: T): T
{
    const childID = child.id;

    const currentIndex = GetChildIndex(child);

    const children = GetSiblingIDs(childID);

    if (children.length > 1 && currentIndex < (children.length - 1))
    {
        const index2 = currentIndex + 1;
        const child2 = children[index2];

        children[currentIndex] = child2;
        children[index2] = childID;

        SetDirtyWorldDisplayList(childID);
    }

    return child;
}
