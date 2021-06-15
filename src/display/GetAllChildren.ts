import { DepthFirstSearch } from './DepthFirstSearch';
import { IGameObject } from '../gameobjects/IGameObject';

export function GetAllChildren <P extends IGameObject> (parent: P, property?: string | symbol, value?: never): IGameObject[]
{
    const children = DepthFirstSearch(parent);

    //  Fast path out of here
    if (!property)
    {
        return children;
    }

    return children.filter(child =>
    {
        const descriptor = Object.getOwnPropertyDescriptor(child, property);

        return (descriptor && (value === undefined || value === descriptor.value));
    });
}
