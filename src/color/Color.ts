import { IColor } from './IColor';
import { RGBAToFloat } from './RGBAToFloat';
import { RGBToFloat } from './RGBToFloat';

export class Color implements IColor
{
    //  Using a Uint8ClampedArray means we guarantee values are in the 0-255 range
    private _rgba: Uint8ClampedArray;
    private _gl: Float32Array;
    private _color: number;
    private _color32: number;

    constructor (red: number = 0, green: number = 0, blue: number = 0, alpha: number = 1)
    {
        this._rgba = new Uint8ClampedArray(4);
        this._gl = new Float32Array(4);

        this.set(red, green, blue, alpha);
    }

    set (red: number, green: number, blue: number, alpha?: number): this
    {
        if (alpha === undefined)
        {
            this._rgba.set([ red, green, blue ]);
        }
        else
        {
            this._rgba.set([ red, green, blue, alpha ]);
        }

        return this.update();
    }

    fromArray (rgba: number[]): this
    {
        this._rgba.set(rgba);

        return this.update();
    }

    getColor (): number
    {
        return this._color;
    }

    getColor32 (): number
    {
        return this._color32;
    }

    private update (): this
    {
        const [ r, g, b, a ] = this._rgba;

        this._gl.set([ r / 255, g / 255, b / 255, a / 255 ]);

        this._color = RGBToFloat(r, g, b);
        this._color32 = RGBAToFloat(r, g, b, a);

        return this;
    }

    get red (): number
    {
        return this._rgba[0];
    }

    set red (value: number)
    {
        this._rgba[0] = value;

        this.update();
    }

    get green (): number
    {
        return this._rgba[1];
    }

    set green (value: number)
    {
        this._rgba[1] = value;

        this.update();
    }

    get blue (): number
    {
        return this._rgba[2];
    }

    set blue (value: number)
    {
        this._rgba[2] = value;

        this.update();
    }

    get alpha (): number
    {
        return this._rgba[3];
    }

    set alpha (value: number)
    {
        this._rgba[3] = value;

        this.update();
    }
}
