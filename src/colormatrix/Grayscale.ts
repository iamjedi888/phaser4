import { IContainer } from '../gameobjects/container/IContainer';
import { Saturate } from './Saturate';

export function Grayscale <T extends IContainer> (gameObject: T, value: number, multiply: boolean = false): T
{
    return Saturate(gameObject, -value, multiply);
}
