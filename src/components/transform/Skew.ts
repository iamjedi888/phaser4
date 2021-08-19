import { TRANSFORM, Transform2DComponent } from './Transform2DComponent';

import { IVec2 } from '../../math/vec2/IVec2';
import { SetDirtyTransform } from '../dirty/SetDirtyTransform';
import { UpdateAxisAligned } from './UpdateAxisAligned';

export class Skew implements IVec2
{
    private id: number;

    constructor (id: number, x: number = 0, y: number = 0)
    {
        this.id = id;

        this.set(x, y);
    }

    set (x: number, y: number = x): this
    {
        const id = this.id;

        Transform2DComponent.data[id][TRANSFORM.SKEW_X] = x;
        Transform2DComponent.data[id][TRANSFORM.SKEW_Y] = y;

        UpdateAxisAligned(id);
        SetDirtyTransform(id);

        return this;
    }

    set x (value: number)
    {
        const id = this.id;

        Transform2DComponent.data[id][TRANSFORM.SKEW_X] = value;

        UpdateAxisAligned(id);
        SetDirtyTransform(id);
    }

    get x (): number
    {
        return Transform2DComponent.data[this.id][TRANSFORM.SKEW_X];
    }

    set y (value: number)
    {
        const id = this.id;

        Transform2DComponent.data[id][TRANSFORM.SKEW_Y] = value;

        UpdateAxisAligned(id);
        SetDirtyTransform(id);
    }

    get y (): number
    {
        return Transform2DComponent.data[this.id][TRANSFORM.SKEW_Y];
    }
}
