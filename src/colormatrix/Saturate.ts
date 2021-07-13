import { IContainer } from '../gameobjects/container/IContainer';
import { SetColorMatrix } from './SetColorMatrix';

export function Saturate <T extends IContainer> (gameObject: T, value: number, multiply: boolean = false): T
{
    const x = (value * 2 / 3) + 1;
    const y = ((x - 1) * -0.5);

    const values = [
        x, y, y, 0,
        y, x, y, 0,
        y, y, x, 0,
        0, 0, 0, 1
    ];

    if (SetColorMatrix(gameObject.id, values, multiply))
    {
        gameObject.color.useColorMatrix = true;
    }

    return gameObject;
}
