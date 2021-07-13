import { DEFAULT_COLOR_OFFSET } from './consts';
import { IContainer } from '../gameobjects/container/IContainer';
import { SetColorMatrix } from './SetColorMatrix';

const values = [
    -1, 0, 0, 1,
    0, -1, 0, 1,
    0, 0, -1, 1,
    0, 0, 0, 1
];

export function Negative <T extends IContainer> (gameObject: T, multiply: boolean = false): T
{
    if (SetColorMatrix(gameObject.id, values, DEFAULT_COLOR_OFFSET, multiply))
    {
        gameObject.color.colorMatrixEnabled = true;
    }

    return gameObject;
}
