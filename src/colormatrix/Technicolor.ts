import { IColorComponent } from '../components/color/IColorComponent';
import { IGameObject } from '../gameobjects/IGameObject';
import { SetColorMatrix } from './SetColorMatrix';

const values = [
    1.9125277891456083, -0.8545344976951645, -0.09155508482755585, 0,
    -0.3087833385928097, 1.7658908555458428, -0.10601743074722245, 0,
    -0.231103377548616, -0.7501899197440212, 1.847597816108189, 0,
    0, 0, 0, 1
];

const offsets = [
    11.793603434377337,
    -70.35205161461398,
    30.950940869491138,
    0
];

export function Technicolor <T extends IGameObject & IColorComponent> (gameObject: T, multiply: boolean = false): T
{
    if (SetColorMatrix(gameObject.id, values, offsets, multiply))
    {
        gameObject.color.colorMatrixEnabled = true;
    }

    return gameObject;
}
