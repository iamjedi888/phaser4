import { GameObjectStore, TRANSFORM } from '../../gameobjects/GameObjectStore';

import { IVec2 } from '../../math/vec2/IVec2';
import { SetDirtyTransform } from '../dirty/SetDirtyTransform';
import { UpdateAxisAligned } from './UpdateAxisAligned';

export class Skew implements IVec2
{
    private id: number;
    private _x: number;
    private _y: number;

    constructor (id: number, x: number = 0, y: number = 0)
    {
        this.id = id;

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
        this._x = value;

        const id = this.id;

        GameObjectStore.f32[id][TRANSFORM.SKEW_X] = value;

        UpdateAxisAligned(id);
        SetDirtyTransform(id);
    }

    get x (): number
    {
        return this._x;
    }

    set y (value: number)
    {
        this._y = value;

        const id = this.id;

        GameObjectStore.f32[id][TRANSFORM.SKEW_Y] = value;

        UpdateAxisAligned(id);
        SetDirtyTransform(id);
    }

    get y (): number
    {
        return this._y;
    }
}
