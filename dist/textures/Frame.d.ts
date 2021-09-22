import { IFrame } from './IFrame';
import { Texture } from './Texture';
export declare class Frame implements IFrame {
    texture: Texture;
    key: string | number;
    x: number;
    y: number;
    width: number;
    height: number;
    trimmed: boolean;
    sourceSizeWidth: number;
    sourceSizeHeight: number;
    spriteSourceSizeX: number;
    spriteSourceSizeY: number;
    spriteSourceSizeWidth: number;
    spriteSourceSizeHeight: number;
    pivot: {
        x: number;
        y: number;
    };
    u0: number;
    v0: number;
    u1: number;
    v1: number;
    constructor(texture: Texture, key: string | number, x: number, y: number, width: number, height: number);
    destroy(): void;
}
//# sourceMappingURL=Frame.d.ts.map