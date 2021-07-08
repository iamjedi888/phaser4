import { DrawFrame } from '../../renderer/webgl1/draw/DrawFrame';
import { DrawImage } from '../../renderer/webgl1/draw/DrawImage';
import { DrawImagePart } from '../../renderer/webgl1/draw/DrawImagePart';
import { DrawQuad } from '../../renderer/webgl1/draw/DrawQuad';
import { FillArc } from '../../renderer/webgl1/draw/FillArc';
import { FillLine } from '../../renderer/webgl1/draw/FillLine';
import { FillRect } from '../../renderer/webgl1/draw/FillRect';
import { FillTriangle } from '../../renderer/webgl1/draw/FillTriangle';
import { GameObject } from '../GameObject';
import { IFrame } from '../../textures/IFrame';
import { IRenderPass } from '../../renderer/webgl1/renderpass/IRenderPass';
import { ITexture } from '../../textures/ITexture';

export class DirectDraw extends GameObject
{
    readonly type: string = 'DirectDraw';

    //  In the 0 to 1 range
    red: number = 1;
    green: number = 1;
    blue: number = 1;
    alpha: number = 1;

    smoothness: number = 8;

    private renderPass: IRenderPass;
    private _color: number;

    constructor ()
    {
        super();
    }

    set color (value: number)
    {
        if (value !== undefined && value !== this._color)
        {
            this.red = (value >> 16 & 0xFF) / 255;
            this.green = (value >> 8 & 0xFF) / 255;
            this.blue = (value & 0xFF) / 255;

            this._color = value;
        }
    }

    //  Values in the range 0 to 255
    setRGB (red: number, green: number, blue: number, alpha: number = 1): this
    {
        this.red = red / 255;
        this.green = green / 255;
        this.blue = blue / 255;
        this.alpha = alpha;

        return this;
    }

    arc (x: number, y: number, radius: number, startAngle: number = 0, endAngle: number = 6.283185307179586, anticlockwise: boolean = false, includeCenter: boolean = false, color?: number): this
    {
        this.color = color;

        FillArc(
            this.renderPass,
            x, y, radius,
            startAngle, endAngle, this.smoothness,
            anticlockwise, includeCenter,
            this.red, this.green, this.blue, this.alpha
        );

        return this;
    }

    circle (x: number, y: number, radius: number, color?: number): this
    {
        this.color = color;

        FillArc(
            this.renderPass,
            x, y, radius,
            0, Math.PI * 2, this.smoothness,
            false, false,
            this.red, this.green, this.blue, this.alpha
        );

        return this;
    }

    plot (x: number, y: number, color?: number): this
    {
        this.color = color;

        FillRect(this.renderPass, x, y, 1, 1, this.red, this.green, this.blue, this.alpha);

        return this;
    }

    //  Draws a box (like rect but un-filled) from x/y to x+width,y+height
    //  If the line thickness is > 1 it is positioned _within_ the bounds of the box, not outside or overlapping it
    box (x: number, y: number, width: number, height: number, thickness: number = 1, color?: number): this
    {
        this.color = color;

        const tw = thickness * 0.5;

        //  top, bottom, left, right

        this.line(x, y + tw, x + width, y + tw, thickness);
        this.line(x, y + height - tw, x + width, y + height - tw, thickness);
        this.line(x + tw, y + thickness, x + tw, y + height - thickness, thickness);
        this.line(x + width - tw, y + thickness, x + width - tw, y + height - thickness, thickness);

        return this;
    }

    rect (x: number, y: number, width: number, height: number, color?: number): this
    {
        this.color = color;

        FillRect(this.renderPass, x, y, width, height, this.red, this.green, this.blue, this.alpha);

        return this;
    }

    triangle (x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, color?: number): this
    {
        this.color = color;

        FillTriangle(this.renderPass, x1, y1, x2, y2, x3, y3, this.red, this.green, this.blue, this.alpha);

        return this;
    }

    line (x1: number, y1: number, x2: number, y2: number, width: number, color?: number): this
    {
        this.color = color;

        FillLine(this.renderPass, x1, y1, x2, y2, width, this.red, this.green, this.blue, this.alpha);

        return this;
    }

    image (texture: ITexture, x: number, y: number, alpha: number = 1, scaleX: number = 1, scaleY: number = 1): this
    {
        DrawImage(this.renderPass, texture, x, y, this.alpha * alpha, scaleX, scaleY);

        return this;
    }

    imagePart (texture: ITexture, x0: number, y0: number, x1: number, y1: number, dx: number, dy: number, dw?: number, dh?: number, alpha: number = 1): this
    {
        DrawImagePart(this.renderPass, texture, x0, y0, x1, y1, dx, dy, dw, dh, this.alpha * alpha);

        return this;
    }

    frame (texture: ITexture, frame: string | number | IFrame, x: number, y: number, alpha: number = 1, scaleX: number = 1, scaleY: number = 1): this
    {
        DrawFrame(this.renderPass, texture, frame, x, y, this.alpha * alpha, scaleX, scaleY);

        return this;
    }

    quad (texture: ITexture, frame: string | number | IFrame, x0: number, y0: number, x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, alpha: number = 1): this
    {
        DrawQuad(this.renderPass, texture, frame, x0, y0, x1, y1, x2, y2, x3, y3, this.alpha * alpha);

        return this;
    }

    render (): void
    {
    }

    renderGL <T extends IRenderPass> (renderPass: T): void
    {
        this.renderPass = renderPass;

        this.render();
    }
}
