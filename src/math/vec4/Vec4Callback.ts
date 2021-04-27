import { IVec4Like } from './IVec4Like';
import { NOOP } from '../../utils/NOOP';

export type Vec4CallbackType = (vec3: Vec4Callback) => void;

export class Vec4Callback implements IVec4Like
{
    private _x: number;
    private _y: number;
    private _z: number;
    private _w: number;

    onChange: Vec4CallbackType;

    constructor (onChange: Vec4CallbackType, x: number = 0, y: number = 0, z: number = 0, w: number = 0)
    {
        this._x = x;
        this._y = y;
        this._z = z;
        this._w = w;

        this.onChange = onChange;
    }

    destroy (): void
    {
        this.onChange = NOOP;
    }

    set (x: number = 0, y: number = 0, z: number = 0, w: number = 0): this
    {
        this._x = x;
        this._y = y;
        this._z = z;
        this._w = w;

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

    get w (): number
    {
        return this._w;
    }

    set w (value: number)
    {
        const prev = this._w;

        this._w = value;

        if (prev !== value)
        {
            this.onChange(this);
        }
    }

    toArray (dst: Float32List = [], index: number = 0): Float32List
    {
        const { x, y, z,w } = this;

        dst[ index ] = x;
        dst[ index + 1 ] = y;
        dst[ index + 2 ] = z;
        dst[ index + 3 ] = w;

        return dst;
    }

    fromArray (src: Float32List, index: number = 0): this
    {
        return this.set(
            src[ index ],
            src[ index + 1 ],
            src[ index + 2 ],
            src[ index + 3 ]
        );
    }

    toString (): string
    {
        const { x, y, z, w } = this;

        return `{ x=${x}, y=${y}, z=${z}, w=${w} }`;
    }
}
