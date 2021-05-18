import { IGameObject } from '../gameobjects/IGameObject';
import { SetParent } from './SetParent';

export function AddChild <T extends IGameObject> (parent: IGameObject, child: T): T
{
    parent.children.push(child);

    SetParent(parent, child);

    child.updateWorldTransform();

    return child;
}
