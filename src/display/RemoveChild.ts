import { DecreaseNumChildren } from '../components/hierarchy/DecreaseNumChildren';
import { IGameObject } from '../gameobjects/IGameObject';
import { RemoveChildID } from '../components/hierarchy/RemoveChildID';

export function RemoveChild <P extends IGameObject, C extends IGameObject> (parent: P, child: C): C
{
    const childID = child.id;
    const parentID = parent.id;

    if (child.hasParent(parentID))
    {
        RemoveChildID(childID);

        DecreaseNumChildren(parentID);

        parent.onRemoveChild(childID);
    }

    return child;
}
