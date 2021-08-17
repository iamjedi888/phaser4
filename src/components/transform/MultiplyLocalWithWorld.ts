import { SetDirtyWorldTransform } from '../dirty/SetDirtyWorldTransform';
import { Transform2DComponent } from './Transform2DComponent';

export function MultiplyLocalWithWorld (parentID: number, childID: number): void
{
    const world = Transform2DComponent.world[childID];
    const local = Transform2DComponent.local[childID];

    const [ pa, pb, pc, pd, ptx, pty ] = Transform2DComponent.world[parentID];
    const [ a, b, c, d, tx, ty ] = local;

    world[0] = a * pa + b * pc;
    world[1] = a * pb + b * pd;
    world[2] = c * pa + d * pc;
    world[3] = c * pb + d * pd;
    world[4] = tx * pa + ty * pc + ptx;
    world[5] = tx * pb + ty * pd + pty;

    SetDirtyWorldTransform(childID);
}
