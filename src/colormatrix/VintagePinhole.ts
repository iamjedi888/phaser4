import { IContainer } from '../gameobjects/container/IContainer';
import { SetColorMatrix } from './SetColorMatrix';

const values = [
    0.6279345635605994, 0.3202183420819367, -0.03965408211312453, 0,
    0.02578397704808868, 0.6441188644374771, 0.03259127616149294, 0,
    0.0466055556782719, -0.0851232987247891, 0.5241648018700465, 0,
    0, 0, 0, 1
];

const offsets = [
    9.651285835294123,
    7.462829176470591,
    5.159190588235296,
    0
];

export function VintagePinhole <T extends IContainer> (gameObject: T, multiply: boolean = false): T
{
    if (SetColorMatrix(gameObject.id, values, offsets, multiply))
    {
        gameObject.color.colorMatrixEnabled = true;
    }

    return gameObject;
}
