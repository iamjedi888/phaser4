import { ColorComponent } from './ColorComponent';
import { PermissionsComponent } from '../permissions/PermissionsComponent';

//  red, green, blue in the range 0-255
//  alpha in the range 0-1
//  colorMatrix Float32Array of length 16, values are 0 to 1
//  colorOffset Float32Array of length 4, values are integer

export class Color
{
    private id: number;

    colorMatrixEnabled: boolean = false;

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

    set willColorChildren (value: boolean)
    {
        PermissionsComponent.willColorChildren[this.id] = Number(value);
    }

    get willColorChildren (): boolean
    {
        return Boolean(PermissionsComponent.willColorChildren[this.id]);
    }

    //  16 element array (4x4)
    set colorMatrix (value: Float32List)
    {
        ColorComponent.colorMatrix[this.id].set(value);

        this.colorMatrixEnabled = true;
    }

    get colorMatrix (): Float32Array
    {
        return ColorComponent.colorMatrix[this.id];
    }

    //  4 element array (vec4)
    set colorOffset (value: Float32List)
    {
        ColorComponent.colorOffset[this.id].set(value);
    }

    get colorOffset (): Float32Array
    {
        return ColorComponent.colorOffset[this.id];
    }

    //  All in the range 0-255 or 0x00-0xFF
    set red (value: number)
    {
        ColorComponent.red[this.id] = value;
    }

    get red (): number
    {
        return ColorComponent.red[this.id];
    }

    set green (value: number)
    {
        ColorComponent.green[this.id] = value;
    }

    get green (): number
    {
        return ColorComponent.green[this.id];
    }

    set blue (value: number)
    {
        ColorComponent.blue[this.id] = value;
    }

    get blue (): number
    {
        return ColorComponent.blue[this.id];
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
