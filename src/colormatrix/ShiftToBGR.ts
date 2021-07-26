import { DEFAULT_COLOR_OFFSET } from './const';
import { IColorComponent } from '../components/color/IColorComponent';
import { IGameObject } from '../gameobjects/IGameObject';
import { SetColorMatrix } from './SetColorMatrix';

const values = [
    0, 0, 1, 0,
    0, 1, 0, 0,
    1, 0, 0, 0,
    0, 0, 0, 1
];

export function ShiftToBGR <T extends IGameObject & IColorComponent> (gameObject: T, multiply: boolean = false): T
{
    if (SetColorMatrix(gameObject.id, values, DEFAULT_COLOR_OFFSET, multiply))
    {
        gameObject.color.colorMatrixEnabled = true;
    }

    return gameObject;
}
