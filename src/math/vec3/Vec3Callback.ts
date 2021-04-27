import { IVec3Like } from './IVec3Like';
import { NOOP } from '../../utils/NOOP';

export type Vec3CallbackType = (vec3: Vec3Callback) => void;

export class Vec3Callback implements IVec3Like
{
    private _x: number;
    private _y: number;
    private _z: number;

    onChange: Vec3CallbackType;

    constructor (onChange: Vec3CallbackType, x: number = 0, y: number = 0, z: number = 0)
    {
        this._x = x;
        this._y = y;
        this._z = z;

        this.onChange = onChange;
    }

    destroy (): void
    {
        this.onChange = NOOP;
    }

    set (x: number = 0, y: number = 0, z: number = 0): this
    {
        this._x = x;
        this._y = y;
        this._z = z;

        if (this.onChange)
        {
            this.onChange(this);
        }

        return this;
    }

    get x (): number
    {
        return this._x;
    }

    set x (value: number)
    {
        const prev = this._x;

        this._x = value;

        if (prev !== value)
        {
            this.onChange(this);
        }
    }

    get y (): number
    {
        return this._y;
    }

    set y (value: number)
    {
        const prev = this._y;

        this._y = value;

        if (prev !== value)
        {
            this.onChange(this);
        }
    }

    get z (): number
    {
        return this._z;
    }

    set z (value: number)
    {
        const prev = this._z;

        this._z = value;

        if (prev !== value)
        {
            this.onChange(this);
        }
    }

    toArray (dst: Float32List = [], index: number = 0): Float32List
    {
        const { x, y, z } = this;

        dst[ index ] = x;
        dst[ index + 1 ] = y;
        dst[ index + 2 ] = z;

        return dst;
    }

    fromArray (src: Float32List, index: number = 0): this
    {
        return this.set(
            src[ index ],
            src[ index + 1 ],
            src[ index + 2 ]
        );
    }

    toString (): string
    {
        const { x, y, z } = this;

        return `{ x=${x}, y=${y}, z=${z} }`;
    }
}
