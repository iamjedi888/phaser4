import { IColor } from './IColor';

export class Color implements IColor
{
    rgba: Uint8ClampedArray;

    constructor (red: number = 0, green: number = 0, blue: number = 0, alpha: number = 1)
    {
        //  Using a Uint8ClampedArray means we guarantee values are in the 0-255 range
        this.rgba = new Uint8ClampedArray([ red, green, blue, alpha ]);
    }

    set (red: number, green: number, blue: number, alpha: number = this.alpha): this
    {
        this.rgba.set([ red, green, blue, alpha ]);

        return this;
    }

    setColor (color: number): this
    {
        const rgba = this.rgba;

        //  The color value has an alpha component
        const alpha = (color > 16777215) ? color >>> 24 : 255;

        rgba.set([
            color >> 16 & 0xFF,
            color >> 8 & 0xFF,
            color & 0xFF,
            alpha
        ]);

        return this;
    }

    getColor (includeAlpha: boolean = false): number
    {
        const [ r, g, b, a ] = this.rgba;

        if (includeAlpha)
        {
            return a << 24 | r << 16 | g << 8 | b;
        }
        else
        {
            return r << 16 | g << 8 | b;
        }
    }

    get red (): number
    {
        return this.rgba[0];
    }

    set red (value: number)
    {
        this.rgba[0] = value;
    }

    get green (): number
    {
        return this.rgba[1];
    }

    set green (value: number)
    {
        this.rgba[1] = value;
    }

    get blue (): number
    {
        return this.rgba[2];
    }

    set blue (value: number)
    {
        this.rgba[2] = value;
    }

    get alpha (): number
    {
        return this.rgba[3];
    }

    set alpha (value: number)
    {
        this.rgba[3] = value;
    }
}
