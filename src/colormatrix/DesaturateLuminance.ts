import { IColorComponent } from '../components/color/IColorComponent';
import { IGameObject } from '../gameobjects/IGameObject';
import { SetColorMatrix } from './SetColorMatrix';

const values = [
    0.2764723, 0.9297080, 0.0938197, 0,
    0.2764723, 0.9297080, 0.0938197, 0,
    0.2764723, 0.9297080, 0.0938197, 0,
    0, 0, 0, 1
];

const offsets = [ -37.1, -37.1, -37.1, 0 ];

export function DesaturateLuminance <T extends IGameObject & IColorComponent> (gameObject: T, multiply: boolean = false): T
{
    if (SetColorMatrix(gameObject.id, values, offsets, multiply))
    {
        gameObject.color.colorMatrixEnabled = true;
    }

    return gameObject;
}
