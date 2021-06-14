import { GetChildren } from '../components/hierarchy';
import { IGameObject } from '../gameobjects/IGameObject';

export function CountMatchingChildren <T extends IGameObject> (parent: T, property: string | symbol, value?: never): number
{
    const children = GetChildren(parent.id);

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
