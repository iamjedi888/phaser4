import { Frame } from '../Frame';
import { Texture } from '../Texture';
declare type BitmapCharacter = {
    x: number;
    y: number;
    width: number;
    height: number;
    xOffset: number;
    yOffset: number;
    xAdvance: number;
    kerning: Record<number, number>;
};
declare type BitmapData = {
    font: string;
    size: number;
    lineHeight: number;
    chars: Record<number, BitmapCharacter>;
};
export declare function BitmapTextParser(texture: Texture, xml: XMLDocument, frame?: Frame): BitmapData;
export {};
//# sourceMappingURL=BitmapTextParser.d.ts.map