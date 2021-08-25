import { TRANSFORM, Transform2DComponent } from '../transform/Transform2DComponent';

import { IBaseCamera } from '../../camera/IBaseCamera';

export function UpdateInViewSystem <C extends IBaseCamera> (entities: number[], camera: C, gameFrame: number): number
{
    const cx = camera.getBoundsX();
    const cy = camera.getBoundsY();
    const cright = camera.getBoundsRight();
    const cbottom = camera.getBoundsBottom();

    let total = 0;

    const len = entities.length;

    for (let i = 0; i < len; i++)
    {
        const id = entities[i];

        const data: Float32Array = Transform2DComponent.data[id];

        if (data[TRANSFORM.UPDATED] < gameFrame)
        {
            const bx = data[TRANSFORM.BOUNDS_X1];
            const by = data[TRANSFORM.BOUNDS_Y1];
            const br = data[TRANSFORM.BOUNDS_X2];
            const bb = data[TRANSFORM.BOUNDS_Y2];

            data[TRANSFORM.IN_VIEW] = Number(!(cright < bx || cbottom < by || cx > br || cy > bb));

            data[TRANSFORM.UPDATED] = gameFrame;

            total++;
        }
    }

    return total;
}
