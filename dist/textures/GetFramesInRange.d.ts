import { Frame } from './Frame';
import { ITexture } from './ITexture';
export declare type GetFramesInRangeConfig = {
    prefix?: string;
    start?: number;
    end: number;
    zeroPad?: number;
    suffix?: string;
};
export declare function GetFramesInRange(texture: ITexture, config: GetFramesInRangeConfig): Frame[];
//# sourceMappingURL=GetFramesInRange.d.ts.map