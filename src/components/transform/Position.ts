import { TRANSFORM, Transform2DComponent } from './Transform2DComponent';

import { IVec2 } from '../../math/vec2/IVec2';
import { SetDirtyTransform } from '../dirty';

export class Position implements IVec2
{
    private id: number;

    constructor (id: number, x: number = 0, y: number = 0)
    {
        this.id = id;

        this.x = x;
        this.y = y;
    }

    set (x: number, y: number = x): this
    {
        this.x = x;
        this.y = y;

        return this;
    }

    set x (value: number)
    {
        Transform2DComponent.data[this.id][TRANSFORM.X] = value;
        SetDirtyTransform(this.id);
    }

    get x (): number
    {
        return Transform2DComponent.data[this.id][TRANSFORM.X];
    }

    set y (value: number)
    {
        Transform2DComponent.data[this.id][TRANSFORM.Y] = value;
        SetDirtyTransform(this.id);
    }

    get y (): number
    {
        return Transform2DComponent.data[this.id][TRANSFORM.Y];
    }
}
