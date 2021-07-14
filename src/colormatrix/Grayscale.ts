import { IColorComponent } from '../components/color/IColorComponent';
import { IGameObject } from '../gameobjects/IGameObject';
import { Saturate } from './Saturate';

export function Grayscale <T extends IGameObject & IColorComponent> (gameObject: T, value: number, multiply: boolean = false): T
{
    return Saturate(gameObject, -value, multiply);
}
