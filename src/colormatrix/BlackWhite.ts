import { IContainer } from '../gameobjects/container/IContainer';
import { SetColorMatrix } from './SetColorMatrix';

export function BlackWhite <T extends IContainer> (gameObject: T, multiply: boolean = false): T
{
    const values = [
        0.3, 0.6, 0.1, 0,
        0.3, 0.6, 0.1, 0,
        0.3, 0.6, 0.1, 0,
        0, 0, 0, 1
    ];

    if (SetColorMatrix(gameObject.id, values, multiply))
    {
        gameObject.color.useColorMatrix = true;
    }

    return gameObject;
}
