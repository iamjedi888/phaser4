import { GetChildAt } from './GetChildAt';
import { IGameObject } from '../gameobjects/IGameObject';
import { RemoveChild } from './RemoveChild';

export function RemoveChildAt <T extends IGameObject> (parent: T, index: number): IGameObject | undefined
{
    const child = GetChildAt(parent, index);

    return RemoveChild(parent, child);
}
