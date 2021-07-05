import { CanvasTexture } from '../../textures/types/CanvasTexture';
import { DIRTY_CONST } from '../DIRTY_CONST';
import { GameInstance } from '../../GameInstance';
import { IContainer } from '../container/IContainer';
import { Sprite } from '../sprite/Sprite';

export type VerticalTextAlignment = 'ascent' | 'lineheight';

export class Text extends Sprite
{
    readonly type: string = 'Text';

    private _text: string;

    preRenderCallback: (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) => void;
    wordWrapCallback: (text: string) => string;

    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    splitRegExp: RegExp = /(?:\r\n|\r|\n)/;
    padding = { left: 0, right: 0, top: 0, bottom: 0 };
    verticalAlign: VerticalTextAlignment = 'ascent';
    lineSpacing: number = 0;
    resolution: number;
    font: string = '16px monospace';
    fillStyle: string | CanvasGradient | CanvasPattern = '#fff';
    strokeStyle: string | CanvasGradient | CanvasPattern = '';
    backgroundStyle: string | CanvasGradient | CanvasPattern = '';
    cornerRadius: number = 0;
    textAlign: CanvasTextAlign = 'left';
    textBaseline: CanvasTextBaseline = 'alphabetic';
    lineWidth: number = 0;
    lineDash: number[] = [];
    fixedWidth: number;
    fixedHeight: number;
    antialias: boolean = false;

    constructor (x: number, y: number, text: string | string[] = '', font?: string, fillStyle?: string | CanvasGradient | CanvasPattern)
    {
        super(x, y, CanvasTexture());

        const game = GameInstance.get();

        this.resolution = game.renderer.resolution;

        this.canvas = this.texture.image as HTMLCanvasElement;
        this.context = this.canvas.getContext('2d');

        // this.texture.glTexture = CreateGLTexture(this.canvas, 32, 32, false, this.antialias);

        if (font)
        {
            this.font = font;
        }

        if (fillStyle)
        {
            this.fillStyle = fillStyle;
        }

        this.setText(text);
    }

    private syncContext (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void
    {
        if (this.preRenderCallback)
        {
            this.preRenderCallback(canvas, ctx);
        }

        ctx.font = this.font;
        ctx.textBaseline = this.textBaseline;
        ctx.textAlign = this.textAlign;
        ctx.fillStyle = this.fillStyle;
        ctx.strokeStyle = this.strokeStyle;
        ctx.lineWidth = this.lineWidth;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.setLineDash(this.lineDash);
        ctx.imageSmoothingEnabled = this.antialias;

        //  TODO Shadows
    }

    updateText (): this
    {
        const canvas = this.canvas;
        const ctx = this.context;
        const resolution = this.resolution;

        const lines = this._text.split(this.splitRegExp);

        const padding = this.padding;
        const fillStyle = this.fillStyle;
        const strokeStyle = this.strokeStyle;
        const strokeWidth = this.lineWidth;
        const lineSpacing = this.lineSpacing;
        const strokeWidthHalf = (strokeWidth > 0) ? strokeWidth / 2 : 0;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        this.syncContext(canvas, ctx);

        //  Use specifically for measureText
        ctx.textAlign = 'start';

        //  Measure each line and add them together (note: measure text excludes stroke style!)

        let maxWidth = 0;
        let maxHeight = 0;
        let y = 0;

        const lineMetrics = [];

        const vAlignAscent: boolean = (this.verticalAlign === 'ascent');

        //  Work out an average line height for this font
        const metrics = ctx.measureText('|MÉq');

        const averageLineHeight: number = Math.ceil(Math.abs(metrics.actualBoundingBoxAscent) + Math.abs(metrics.actualBoundingBoxDescent)) + strokeWidth;

        for (let i = 0; i < lines.length; i++)
        {
            const metrics = ctx.measureText(lines[i]);

            const left = metrics.actualBoundingBoxLeft;
            const right = metrics.actualBoundingBoxRight;
            let ascent = metrics.actualBoundingBoxAscent;
            let descent = metrics.actualBoundingBoxDescent;

            //  Zero for a carriage-return, but we still need to add in the space
            if ((!ascent && !descent) || lines[i] === '')
            {
                ascent = averageLineHeight;
                descent = 0;
            }

            const lineWidth = Math.ceil(Math.abs(left) + Math.abs(right)) + strokeWidth;
            const lineHeight = Math.ceil(Math.abs(ascent) + Math.abs(descent)) + strokeWidth;

            if (vAlignAscent)
            {
                y += ascent + strokeWidthHalf;

                if (i > 0)
                {
                    y += lineSpacing + strokeWidthHalf;
                }

                maxHeight = y + descent + strokeWidthHalf;
            }
            else
            {
                y = maxHeight + ((lineHeight - descent) - strokeWidthHalf);

                maxHeight += lineHeight;

                if (i < lines.length - 1)
                {
                    maxHeight += lineSpacing;
                }
            }

            maxWidth = Math.max(maxWidth, lineWidth);

            lineMetrics.push({ lineWidth, lineHeight, ascent, descent, left, right, y });
        }

        //  Account for lineSpacing + padding
        maxWidth += padding.left + padding.right;
        maxHeight += padding.top + padding.bottom;

        const displayWidth = (this.fixedWidth) ? this.fixedWidth : maxWidth;
        const displayHeight = (this.fixedHeight) ? this.fixedHeight : maxHeight;

        const canvasWidth = Math.ceil(displayWidth * resolution);
        const canvasHeight = Math.ceil(displayHeight * resolution);

        if (canvas.width !== canvasWidth || canvas.height !== canvasHeight)
        {
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;

            this.texture.setSize(displayWidth, displayHeight);

            this.size.set(displayWidth, displayHeight);
        }

        ctx.save();
        ctx.scale(resolution, resolution);

        this.syncContext(canvas, ctx);

        const backgroundStyle = this.backgroundStyle;

        if (backgroundStyle)
        {
            ctx.save();

            ctx.fillStyle = backgroundStyle;
            ctx.strokeStyle = backgroundStyle;

            const cornerRadius = this.cornerRadius;
            const halfRadius = (cornerRadius > 0) ? cornerRadius / 2 : 0;

            if (cornerRadius)
            {
                ctx.lineWidth = cornerRadius;

                ctx.strokeRect(halfRadius, halfRadius, displayWidth - cornerRadius, displayHeight - cornerRadius);
            }

            ctx.fillRect(halfRadius, halfRadius, displayWidth - cornerRadius, displayHeight - cornerRadius);

            ctx.restore();
        }

        //  Text Alignment
        const textAlign = this.textAlign;
        const isCenter: boolean = (textAlign === 'center');
        const isRight: boolean = (textAlign === 'right' || textAlign === 'end');

        const yOffset = ((displayHeight - maxHeight) / 2) + padding.top;

        for (let i = 0; i < lines.length; i++)
        {
            const line = lines[i];
            const metrics = lineMetrics[i];

            let tx = padding.left + metrics.left + strokeWidthHalf;
            const ty = yOffset + metrics.y;

            if (isCenter)
            {
                tx = displayWidth / 2;
            }
            else if (isRight)
            {
                tx = displayWidth - strokeWidthHalf;
            }

            if (strokeStyle)
            {
                ctx.strokeText(line, tx, ty);
            }

            if (fillStyle)
            {
                ctx.fillText(line, tx, ty);
            }
        }

        ctx.restore();

        if (this.texture.binding)
        {
            this.texture.binding.update();
        }

        // this.setDirty(DIRTY_CONST.TEXTURE);

        return this;
    }

    get text (): string | string[]
    {
        return this._text;
    }

    set text (value: string | string[])
    {
        this.setText(value);
    }

    setText (value: string | string[] = ''): this
    {
        if (Array.isArray(value))
        {
            value = value.join('\n');
        }

        if (value !== this._text)
        {
            this._text = value.toString();

            this.updateText();
        }

        return this;
    }

    destroy (reparentChildren?: IContainer): void
    {
        this.texture.destroy();

        this.fillStyle = null;
        this.strokeStyle = null;
        this.backgroundStyle = null;

        this.canvas = null;
        this.context = null;

        super.destroy(reparentChildren);
    }
}
