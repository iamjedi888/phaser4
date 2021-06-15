import { IGameObject } from '../gameobjects/IGameObject';

export function SetValue <T extends IGameObject> (property: string | symbol, value: never, ...children: T[]): T[]
{
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
