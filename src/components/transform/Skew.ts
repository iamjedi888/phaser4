import { TRANSFORM, Transform2DComponent } from './Transform2DComponent';

import { IVec2 } from '../../math/vec2/IVec2';
import { SetDirtyTransform } from '../dirty/SetDirtyTransform';
import { UpdateAxisAligned } from './UpdateAxisAligned';

export class Skew implements IVec2
{
    private id: number;
    private _x: number;
    private _y: number;
    private _data: Float32Array;

    constructor (id: number, x: number = 0, y: number = 0)
    {
        this.id = id;

        this._data = Transform2DComponent.data[id];

        this.set(x, y);
    }

    set (x: number, y: number = x): this
    {
        this.x = x;
        this.y = y;

        return this;
    }

    set x (value: number)
    {
        if (value !== this._x)
        {
            this._x = value;

            this._data[TRANSFORM.SKEW_X] = value;

            const id = this.id;

            UpdateAxisAligned(id);
            SetDirtyTransform(id);
        }
    }

    get x (): number
    {
        return this._x;
    }

    set y (value: number)
    {
        if (value !== this._x)
        {
            this._y = value;

            this._data[TRANSFORM.SKEW_Y] = value;

            const id = this.id;

            UpdateAxisAligned(id);
            SetDirtyTransform(id);
        }
    }

    get y (): number
    {
        return this._y;
    }

    destroy (): void
    {
        this._data = null;
    }
}
