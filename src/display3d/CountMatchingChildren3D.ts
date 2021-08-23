import { IGameObject3D } from '../gameobjects3d/IGameObject3D';

export function CountMatchingChildren3D (parent: IGameObject3D, property: string | symbol, value?: never): number
{
    const children = parent.children;

    let total = 0;

    children.forEach(child =>
    {
        const descriptor = Object.getOwnPropertyDescriptor(child, property);

        if (descriptor && (value === undefined || value === descriptor.value))
        {
            total++;
        }
    });

    return total;
}
