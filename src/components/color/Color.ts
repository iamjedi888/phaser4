import { ColorComponent } from './ColorComponent';

//  red, green, blue in the range 0-255
//  alpha in the range 0-1

export class Color
{
    private id: number;

    constructor (id: number, red: number = 255, green: number = 255, blue: number = 255, alpha: number = 1)
    {
        this.id = id;

        this.set(red, green, blue, alpha);
    }

    set (red: number, green: number, blue: number, alpha: number): void
    {
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.alpha = alpha;
    }

    //  All in the range 0-255 or 0x00-0xFF
    set red (value: number)
    {
        ColorComponent.red[this.id] = value / 255;
    }

    get red (): number
    {
        return ColorComponent.red[this.id] * 255;
    }

    set green (value: number)
    {
        ColorComponent.green[this.id] = value / 255;
    }

    get green (): number
    {
        return ColorComponent.green[this.id] * 255;
    }

    set blue (value: number)
    {
        ColorComponent.blue[this.id] = value / 255;
    }

    get blue (): number
    {
        return ColorComponent.blue[this.id] * 255;
    }

    set alpha (value: number)
    {
        ColorComponent.alpha[this.id] = value;
    }

    get alpha (): number
    {
        return ColorComponent.alpha[this.id];
    }
}
