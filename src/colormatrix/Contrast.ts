import { IContainer } from '../gameobjects/container/IContainer';
import { SetColorMatrix } from './SetColorMatrix';

export function Contrast <T extends IContainer> (gameObject: T, value: number, multiply: boolean = false): T
{
    const v = value + 1;
    const o = -0.5 * (v - 1);

    const values = [
        v, 0, 0, 0, o,
        0, v, 0, 0, o,
        0, 0, v, 0, o,
        0, 0, 0, 1, 0
    ];

    //  TODO - Need to pass the constants here after values

    if (SetColorMatrix(gameObject.id, values, multiply))
    {
        gameObject.color.useColorMatrix = true;
    }

    return gameObject;
}
