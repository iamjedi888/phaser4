import { IContainer } from '../gameobjects/container/IContainer';
import { SetColorMatrix } from './SetColorMatrix';

export function Hue <T extends IContainer> (gameObject: T, rotation: number, multiply: boolean = false): T
{
    rotation = rotation / 180 * Math.PI;

    const cos = Math.cos(rotation);
    const sin = Math.sin(rotation);
    const lumR = 0.213;
    const lumG = 0.715;
    const lumB = 0.072;

    const values = [
        lumR + cos * (1 - lumR) + sin * (-lumR),lumG + cos * (-lumG) + sin * (-lumG),lumB + cos * (-lumB) + sin * (1 - lumB), 0,
        lumR + cos * (-lumR) + sin * (0.143),lumG + cos * (1 - lumG) + sin * (0.140),lumB + cos * (-lumB) + sin * (-0.283), 0,
        lumR + cos * (-lumR) + sin * (-(1 - lumR)),lumG + cos * (-lumG) + sin * (lumG),lumB + cos * (1 - lumB) + sin * (lumB), 0,
        0, 0, 0, 1
    ];

    if (SetColorMatrix(gameObject.id, values, multiply))
    {
        gameObject.color.useColorMatrix = true;
    }

    return gameObject;
}
