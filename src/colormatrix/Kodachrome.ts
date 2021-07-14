import { IColorComponent } from '../components/color/IColorComponent';
import { IGameObject } from '../gameobjects/IGameObject';
import { SetColorMatrix } from './SetColorMatrix';

const values = [
    1.1285582396593525, -0.3967382283601348, -0.03992559172921793, 0,
    -0.16404339962244616, 1.0835251566291304, -0.05498805115633132, 0,
    -0.16786010706155763, -0.5603416277695248, 1.6014850761964943, 0,
    0, 0, 0, 1
];

const offsets = [
    63.72958762196502,
    24.732407896706203,
    35.62982807460946,
    0
];

export function Kodachrome <T extends IGameObject & IColorComponent> (gameObject: T, multiply: boolean = false): T
{
    if (SetColorMatrix(gameObject.id, values, offsets, multiply))
    {
        gameObject.color.colorMatrixEnabled = true;
    }

    return gameObject;
}
