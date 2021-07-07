import { DrawFrame } from '../../renderer/webgl1/draw/DrawFrame';
import { DrawImage } from '../../renderer/webgl1/draw/DrawImage';
import { DrawImagePart } from '../../renderer/webgl1/draw/DrawImagePart';
import { DrawQuad } from '../../renderer/webgl1/draw/DrawQuad';
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

    alpha: number = 1;

    private renderPass: IRenderPass;

    constructor ()
    {
        super();
    }

    plot (x: number, y: number, color: number, alpha: number = 1): this
    {
        FillRect(this.renderPass, x, y, 1, 1, color, this.alpha * alpha);

        return this;
    }

    box (x: number, y: number, width: number, height: number, color: number, thickness: number = 1, alpha: number = 1): this
    {
        //   TODO - The box should be centered on x/y/w/h if thickness > 1

        //  top
        this.line(x, y, x + width, y, thickness, color, alpha);

        //  bottom
        this.line(x, y + height - thickness, x + width, y + height - thickness, thickness, color, alpha);

        //  left
        this.line(x + thickness, y + thickness, x, y + height - thickness - thickness, thickness, color, alpha);

        // right
        this.line(x + width - thickness, y + thickness, x + width, y + height - thickness - thickness, thickness, color, alpha);

        return this;
    }

    rect (x: number, y: number, width: number, height: number, color: number, alpha: number = 1): this
    {
        FillRect(this.renderPass, x, y, width, height, color, this.alpha * alpha);

        return this;
    }

    triangle (x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, color: number, alpha: number = 1): this
    {
        FillTriangle(this.renderPass, x1, y1, x2, y2, x3, y3, color, this.alpha * alpha);

        return this;
    }

    line (x0: number, y0: number, x1: number, y1: number, width: number, color: number, alpha: number = 1): this
    {
        FillLine(this.renderPass, x0, y0, x1, y1, width, color, this.alpha * alpha);

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
