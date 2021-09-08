import { TRANSFORM, Transform2DComponent } from './Transform2DComponent';

import { IVec2 } from '../../math/vec2/IVec2';
import { UpdateExtent } from './UpdateExtent';

export class Origin implements IVec2
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
        const data = this._data;

        this._x = x;
        this._y = y;

        data[TRANSFORM.ORIGIN_X] = x;
        data[TRANSFORM.ORIGIN_Y] = y;

        UpdateExtent(this.id, data[TRANSFORM.FRAME_WIDTH], data[TRANSFORM.FRAME_HEIGHT]);

        return this;
    }

    set x (value: number)
    {
        const data = this._data;

        this._x = value;

        data[TRANSFORM.ORIGIN_X] = value;

        UpdateExtent(this.id, data[TRANSFORM.FRAME_WIDTH], data[TRANSFORM.FRAME_HEIGHT]);
    }

    get x (): number
    {
        return this._x;
    }

    set y (value: number)
    {
        const data = this._data;

        this._y = value;

        data[TRANSFORM.ORIGIN_Y] = value;

        UpdateExtent(this.id, data[TRANSFORM.FRAME_WIDTH], data[TRANSFORM.FRAME_HEIGHT]);
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
