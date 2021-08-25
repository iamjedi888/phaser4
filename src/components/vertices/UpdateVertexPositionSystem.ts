import { ClearDirtyChildTransform } from '../dirty/ClearDirtyChildTransform';
import { ClearDirtyWorldTransform } from '../dirty/ClearDirtyWorldTransform';
import { HasDirtyWorldTransform } from '../dirty/HasDirtyWorldTransform';
import { IBaseCamera } from '../../camera/IBaseCamera';
import { SetQuadFromWorld } from './SetQuadFromWorld';

export function UpdateVertexPositionSystem <C extends IBaseCamera> (entities: number[], camera: C, gameFrame: number): number
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

        if (HasDirtyWorldTransform(id))
        {
            SetQuadFromWorld(id, gameFrame, cx, cy, cright, cbottom);

            ClearDirtyWorldTransform(id);
            ClearDirtyChildTransform(id);

            total++;
        }
    }

    return total;
}
