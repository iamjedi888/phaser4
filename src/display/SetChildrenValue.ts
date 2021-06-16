import { DepthFirstSearch } from './DepthFirstSearch';
import { IGameObject } from '../gameobjects/IGameObject';

export function SetChildrenValue <P extends IGameObject> (parent: P, property: string | symbol, value: never): IGameObject[]
{
    //  TODO - This will impact ALL children? Perhaps it should be 1 level only
    const children = DepthFirstSearch(parent);

    children.forEach(child =>
    {
        const descriptor = Object.getOwnPropertyDescriptor(child, property);

        if (descriptor)
        {
            descriptor.set(value);
        }
    });

    return children;
}
