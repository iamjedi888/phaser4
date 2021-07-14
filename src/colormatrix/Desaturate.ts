import { IColorComponent } from '../components/color/IColorComponent';
import { IGameObject } from '../gameobjects/IGameObject';
import { Saturate } from './Saturate';

export function Desaturate <T extends IGameObject & IColorComponent> (gameObject: T, multiply: boolean = false): T
{
    return Saturate(gameObject, -1, multiply);
}
