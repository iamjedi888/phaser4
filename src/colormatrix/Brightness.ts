import { IContainer } from '../gameobjects/container/IContainer';
import { SetColorMatrix } from './SetColorMatrix';

export function Brightness <T extends IContainer> (gameObject: T, value: number, multiply: boolean = false): T
{
    const b = value;

    const values = [
        b, 0, 0, 0,
        0, b, 0, 0,
        0, 0, b, 0,
        0, 0, 0, 1
    ];

    if (SetColorMatrix(gameObject.id, values, multiply))
    {
        gameObject.color.useColorMatrix = true;
    }

    return gameObject;
}
