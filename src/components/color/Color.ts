import { AddColorComponent } from './AddColorComponent';
import { ColorComponent } from './ColorComponent';
import { PermissionsComponent } from '../permissions/PermissionsComponent';
import { SetDirtyColor } from '../dirty';

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
        AddColorComponent(id);

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

    //  In the range 0x000000 to 0xffffff (alpha is ignored)
    set tint (value: number)
    {
        this.red = (value >> 16) & 0xff;
        this.green = (value >> 8) & 0xff;
        this.blue = value & 0xff;
    }

    get tint (): number
    {
        return this.red << 16 | this.green << 8 | this.blue;
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

        SetDirtyColor(this.id);

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

        SetDirtyColor(this.id);
    }

    get colorOffset (): Float32Array
    {
        return ColorComponent.colorOffset[this.id];
    }

    //  All in the range 0-255 or 0x00-0xFF
    set red (value: number)
    {
        ColorComponent.r[this.id] = value;

        SetDirtyColor(this.id);
    }

    get red (): number
    {
        return ColorComponent.r[this.id];
    }

    set green (value: number)
    {
        ColorComponent.g[this.id] = value;

        SetDirtyColor(this.id);
    }

    get green (): number
    {
        return ColorComponent.g[this.id];
    }

    set blue (value: number)
    {
        ColorComponent.b[this.id] = value;

        SetDirtyColor(this.id);
    }

    get blue (): number
    {
        return ColorComponent.b[this.id];
    }

    set alpha (value: number)
    {
        ColorComponent.a[this.id] = value;

        SetDirtyColor(this.id);
    }

    get alpha (): number
    {
        return ColorComponent.a[this.id];
    }
}
