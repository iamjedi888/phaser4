import { GameObjectTree } from '../gameobjects/GameObjectTree';
import { GetChildIndex } from './GetChildIndex';
import { GetWorldID } from '../components/hierarchy';
import { IGameObject } from '../gameobjects/IGameObject';
import { SetDirtyDisplayList } from '../components/dirty/SetDirtyDisplayList';

export function SendChildToBack <P extends IGameObject, C extends IGameObject> (parent: P, child: C): C
{
    const currentIndex = GetChildIndex(parent, child);

    const parentID = parent.id;

    const children = GameObjectTree.get(parentID);

    const worldID = GetWorldID(parentID);

    if (currentIndex !== -1 && currentIndex < children.length)
    {
        children.splice(currentIndex, 1);
        children.unshift(child.id);

        SetDirtyDisplayList(worldID);
    }

    return child;
}
