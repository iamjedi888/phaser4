import { DEFAULT_COLOR_OFFSET } from './const';
import { IColorComponent } from '../components/color/IColorComponent';
import { IGameObject } from '../gameobjects/IGameObject';
import { SetColorMatrix } from './SetColorMatrix';

//  See http://stackoverflow.com/questions/8507885/shift-hue-of-an-rgb-color/8510751#8510751

export function Hue <T extends IGameObject & IColorComponent> (gameObject: T, rotation: number = 0, multiply: boolean = false): T
{
    rotation /= 180 * Math.PI;

    const cosR = Math.cos(rotation);
    const sinR = Math.sin(rotation);

    const w = 1 / 3;
    const sqrW = Math.sqrt(w);

    const a00 = cosR + ((1.0 - cosR) * w);
    const a01 = (w * (1.0 - cosR)) - (sqrW * sinR);
    const a02 = (w * (1.0 - cosR)) + (sqrW * sinR);

    const a10 = (w * (1.0 - cosR)) + (sqrW * sinR);
    const a11 = cosR + (w * (1.0 - cosR));
    const a12 = (w * (1.0 - cosR)) - (sqrW * sinR);

    const a20 = (w * (1.0 - cosR)) - (sqrW * sinR);
    const a21 = (w * (1.0 - cosR)) + (sqrW * sinR);
    const a22 = cosR + (w * (1.0 - cosR));

    const values = [
        a00, a01, a02, 0,
        a10, a11, a12, 0,
        a20, a21, a22, 0,
        0, 0, 0, 1
    ];

    if (SetColorMatrix(gameObject.id, values, DEFAULT_COLOR_OFFSET, multiply))
    {
        gameObject.color.colorMatrixEnabled = true;
    }

    return gameObject;
}
