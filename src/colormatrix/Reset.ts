import { DEFAULT_COLOR_MATRIX, DEFAULT_COLOR_OFFSET } from './const';

import { IColorComponent } from '../components/color/IColorComponent';
import { IGameObject } from '../gameobjects/IGameObject';
import { SetColorMatrix } from './SetColorMatrix';

export function Reset <T extends IGameObject & IColorComponent> (gameObject: T): T
{
    if (SetColorMatrix(gameObject.id, DEFAULT_COLOR_MATRIX, DEFAULT_COLOR_OFFSET, false))
    {
        gameObject.color.colorMatrixEnabled = false;
    }

    return gameObject;
}
