import { Texture } from '../Texture';
export declare type ColorStop = {
    offset: number;
    color: string;
};
export declare type LinearGradientTextureType = {
    width?: number;
    height?: number;
    x0?: number;
    y0?: number;
    x1?: number;
    y1?: number;
    horizontal?: boolean;
    colorStops?: ColorStop[];
};
export declare function LinearGradientTexture(config: LinearGradientTextureType): Texture;
//# sourceMappingURL=LinearGradientTexture.d.ts.map