import { IBaseCamera } from '../../camera/IBaseCamera';
import { SetInViewFromBounds } from '../transform/SetInViewFromBounds';
import { WillRender } from '../permissions/WillRender';

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

        if (WillRender(id))
        {
            SetInViewFromBounds(id, gameFrame, cx, cy, cright, cbottom);

            total++;
        }
    }

    return total;
}
