import { AddChild } from './AddChild';
import { IGameObject } from '../gameobjects/IGameObject';

type Constructor<T> = new (...args: unknown[]) => T;

export function AddMultipleInstances <P extends IGameObject, C extends IGameObject> (parent: P, classType: Constructor<C>, quantity: number, params?: unknown[]): C[]
{
    const output = [];

    for (let i = 0; i < quantity; i++)
    {
        output.push(AddChild(parent, new classType(...params)));
    }

    return output;
}
