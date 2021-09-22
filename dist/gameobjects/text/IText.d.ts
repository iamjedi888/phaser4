import { ISprite } from '../sprite/ISprite';
declare type VerticalTextAlignment = 'ascent' | 'lineheight';
export interface IText extends ISprite {
    preRenderCallback: (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) => void;
    wordWrapCallback: (text: string) => string;
    splitRegExp: RegExp;
    padding: {
        left: number;
        right: number;
        top: number;
        bottom: number;
    };
    verticalAlign: VerticalTextAlignment;
    lineSpacing: number;
    resolution: number;
    cornerRadius: number;
    font: string;
    fillStyle: string | CanvasGradient | CanvasPattern;
    strokeStyle: string | CanvasGradient | CanvasPattern;
    backgroundStyle: string | CanvasGradient | CanvasPattern;
    textAlign: CanvasTextAlign;
    textBaseline: CanvasTextBaseline;
    lineWidth: number;
    lineDash: number[];
    fixedWidth: number;
    fixedHeight: number;
    text: string | string[];
    updateText(): this;
    setText(value: string | string[]): this;
}
export {};
//# sourceMappingURL=IText.d.ts.map