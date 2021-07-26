import { DEFAULT_COLOR_OFFSET } from './const';
import { IColorComponent } from '../components/color/IColorComponent';
import { IGameObject } from '../gameobjects/IGameObject';
import { SetColorMatrix } from './SetColorMatrix';

export function Tint <T extends IGameObject & IColorComponent> (gameObject: T, color: number, multiply: boolean = false): T
{
    const r = (color >> 16) & 0xff;
    const g = (color >> 8) & 0xff;
    const b = color & 0xff;

    const values = [
        r / 255, 0, 0, 0,
        0, g / 255, 0, 0,
        0, 0, b / 255, 0,
        0, 0, 0, 1
    ];

    if (SetColorMatrix(gameObject.id, values, DEFAULT_COLOR_OFFSET, multiply))
    {
        gameObject.color.colorMatrixEnabled = true;
    }

    return gameObject;
}
