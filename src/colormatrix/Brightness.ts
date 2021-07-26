import { DEFAULT_COLOR_OFFSET } from './const';
import { IColorComponent } from '../components/color/IColorComponent';
import { IGameObject } from '../gameobjects/IGameObject';
import { SetColorMatrix } from './SetColorMatrix';

export function Brightness <T extends IGameObject & IColorComponent> (gameObject: T, value: number, multiply: boolean = false): T
{
    const b = value;

    const values = [
        b, 0, 0, 0,
        0, b, 0, 0,
        0, 0, b, 0,
        0, 0, 0, 1
    ];

    if (SetColorMatrix(gameObject.id, values, DEFAULT_COLOR_OFFSET, multiply))
    {
        gameObject.color.colorMatrixEnabled = true;
    }

    return gameObject;
}
