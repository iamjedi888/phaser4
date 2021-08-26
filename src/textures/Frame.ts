import { IFrame } from './IFrame';
import { Texture } from './Texture';
import { UpdateFrameUVs } from './UpdateFrameUVs';

export class Frame implements IFrame
{
    texture: Texture;
    key: string | number;

    //  This is the actual area of the texture to draw to canvas / webgl, including any extruded data.
    //  This is the same as the 'trimmed' + 'extruded' area from an atlas.
    x: number;
    y: number;
    width: number;
    height: number;

    trimmed: boolean = false;

    //  Original size of the image before being trimmed or added to an atlas (which can add extrude data to it).
    sourceSizeWidth: number;
    sourceSizeHeight: number;

    //  The size of the image having been trimmed, before being added to the atlas (i.e. doesn't have any extrusion values in it)
    spriteSourceSizeX: number;
    spriteSourceSizeY: number;
    spriteSourceSizeWidth: number;
    spriteSourceSizeHeight: number;

    pivot: { x: number; y: number };

    u0: number;
    v0: number;
    u1: number;
    v1: number;

    constructor (texture: Texture, key: string | number, x: number, y: number, width: number, height: number)
    {
        this.texture = texture;
        this.key = key;

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.sourceSizeWidth = width;
        this.sourceSizeHeight = height;

        UpdateFrameUVs(this);
    }

    destroy (): void
    {
        this.texture = null;
    }
}
