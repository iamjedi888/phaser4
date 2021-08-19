import { TRANSFORM, Transform2DComponent } from './Transform2DComponent';

import { IVec2 } from '../../math/vec2/IVec2';
import { SetDirtyTransform } from '../dirty/SetDirtyTransform';

export class Scale implements IVec2
{
    private id: number;

    constructor (id: number, x: number = 1, y: number = 1)
    {
        this.id = id;

        this.set(x, y);
    }

    set (x: number, y: number = x): this
    {
        const id = this.id;

        Transform2DComponent.data[id][TRANSFORM.SCALE_X] = x;
        Transform2DComponent.data[id][TRANSFORM.SCALE_Y] = y;

        SetDirtyTransform(id);

        return this;
    }

    set x (value: number)
    {
        const id = this.id;

        Transform2DComponent.data[id][TRANSFORM.SCALE_X] = value;

        SetDirtyTransform(id);
    }

    get x (): number
    {
        return Transform2DComponent.data[this.id][TRANSFORM.SCALE_X];
    }

    set y (value: number)
    {
        const id = this.id;

        Transform2DComponent.data[id][TRANSFORM.SCALE_Y] = value;

        SetDirtyTransform(id);
    }

    get y (): number
    {
        return Transform2DComponent.data[this.id][TRANSFORM.SCALE_Y];
    }
}
