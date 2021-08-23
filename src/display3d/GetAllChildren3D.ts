import { DepthFirstSearch3D } from './DepthFirstSearch3D';
import { IGameObject3D } from '../gameobjects3d/IGameObject3D';

export function GetAllChildren3D (parent: IGameObject3D, property?: string | symbol, value?: never): IGameObject3D[]
{
    const children = DepthFirstSearch3D(parent);

    //  Fast path out of here
    if (!property)
    {
        return children;
    }

    const results: IGameObject3D[] = [];

    children.forEach(child =>
    {
        const descriptor = Object.getOwnPropertyDescriptor(child, property);

        if (descriptor && (value === undefined || value === descriptor.value))
        {
            results.push(child);
        }
    });

    return results;
}
