import { NOOP } from '../../utils/NOOP';

export class Quaternion
{
    private _x: number;
    private _y: number;
    private _z: number;
    private _w: number;

    onChange: (quat: Quaternion) => void;

    constructor (x: number = 0, y: number = 0, z: number = 0, w: number = 1)
    {
        this._x = x;
        this._y = y;
        this._z = z;
        this._w = w;

        this.onChange = NOOP;
    }

    set (x: number = 0, y: number = 0, z: number = 0, w: number = 1): this
    {
        this._x = x;
        this._y = y;
        this._z = z;
        this._w = w;

        this.onChange(this);

        return this;
    }

    set x (value: number)
    {
        const prev = this._x;

        this._x = value;

        if (value !== prev)
        {
            this.onChange(this);
        }
    }

    get x (): number
    {
        return this._x;
    }

    set y (value: number)
    {
        const prev = this._y;

        this._y = value;

        if (value !== prev)
        {
            this.onChange(this);
        }
    }

    get y (): number
    {
        return this._y;
    }

    set z (value: number)
    {
        const prev = this._z;

        this._z = value;

        if (value !== prev)
        {
            this.onChange(this);
        }
    }

    get z (): number
    {
        return this._z;
    }

    set w (value: number)
    {
        const prev = this._w;

        this._w = value;

        if (value !== prev)
        {
            this.onChange(this);
        }
    }

    get w (): number
    {
        return this._w;
    }

    toArray (dst: Float32List = [], index: number = 0): Float32List
    {
        const { x, y, z, w } = this;

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

    destroy (): void
    {
        this.onChange = NOOP;
    }

    toString (): string
    {
        const { x, y, z, w } = this;

        return `{ x=${x}, y=${y}, z=${z}, w=${w} }`;
    }
}
