import { IContainer } from '../gameobjects/container/IContainer';
import { Saturate } from './Saturate';

export function Desaturate <T extends IContainer> (gameObject: T, multiply: boolean = false): T
{
    return Saturate(gameObject, -1, multiply);
}
