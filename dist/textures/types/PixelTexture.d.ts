import { Texture } from '../Texture';
export declare type PixelTextureConfig = {
    data: string[];
    canvas?: HTMLCanvasElement;
    palette?: string[];
    pixelWidth?: number;
    pixelHeight?: number;
    resizeCanvas?: boolean;
    clearCanvas?: boolean;
    preRender?: (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) => void;
    postRender?: (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) => void;
};
export declare function PixelTexture(config: PixelTextureConfig): Texture;
//# sourceMappingURL=PixelTexture.d.ts.map