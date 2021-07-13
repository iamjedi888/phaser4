import { DEFAULT_COLOR_MATRIX, DEFAULT_COLOR_OFFSET } from './consts';

import { IContainer } from '../gameobjects/container/IContainer';
import { SetColorMatrix } from './SetColorMatrix';

export function Reset <T extends IContainer> (gameObject: T): T
{
    if (SetColorMatrix(gameObject.id, DEFAULT_COLOR_MATRIX, DEFAULT_COLOR_OFFSET, false))
    {
        gameObject.color.colorMatrixEnabled = false;
    }

    return gameObject;
}
