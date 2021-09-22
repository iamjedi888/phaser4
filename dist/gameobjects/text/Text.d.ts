import { IContainer } from '../container/IContainer';
import { Sprite } from '../sprite/Sprite';
export declare type VerticalTextAlignment = 'ascent' | 'lineheight';
export declare class Text extends Sprite {
    readonly type: string;
    private _text;
    preRenderCallback: (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) => void;
    wordWrapCallback: (text: string) => string;
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
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
    font: string;
    fillStyle: string | CanvasGradient | CanvasPattern;
    strokeStyle: string | CanvasGradient | CanvasPattern;
    backgroundStyle: string | CanvasGradient | CanvasPattern;
    cornerRadius: number;
    textAlign: CanvasTextAlign;
    textBaseline: CanvasTextBaseline;
    lineWidth: number;
    lineDash: number[];
    fixedWidth: number;
    fixedHeight: number;
    antialias: boolean;
    constructor(x: number, y: number, text?: string | string[], font?: string, fillStyle?: string | CanvasGradient | CanvasPattern);
    private syncContext;
    updateText(): this;
    get text(): string | string[];
    set text(value: string | string[]);
    setText(value?: string | string[]): this;
    destroy(reparentChildren?: IContainer): void;
}
//# sourceMappingURL=Text.d.ts.map