import { IGameObject } from '../gameobjects/IGameObject';
import { SetParent } from './SetParent';

export function AddChildrenAt (parent: IGameObject, index: number, ...children: IGameObject[]): IGameObject[]
{
    const parentChildren = parent.children;

    if (index >= 0 && index <= parentChildren.length)
    {
        children.reverse().forEach(child =>
        {
            children.splice(index, 0, child);

            SetParent(parent, child);

            child.updateWorldTransform();
        });
    }

    return children;
}
