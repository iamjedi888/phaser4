import { DepthFirstSearch3D } from './DepthFirstSearch3D';
import { IGameObject3D } from '../gameobjects3d/IGameObject3D';

export function SetChildren3DValue (parent: IGameObject3D, property: string | symbol, value: never): IGameObject3D[]
{
    const children = DepthFirstSearch3D(parent);

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
