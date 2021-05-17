import { IAnimationConfig } from './IAnimationConfig';
import { ITexture } from '../textures/ITexture';
export interface IAnimationFromAtlas extends IAnimationConfig {
    texture: string | ITexture;
    prefix?: string;
    start?: number;
    end: number;
    zeroPad?: number;
    suffix?: string;
}
//# sourceMappingURL=IAnimationFromAtlasConfig.d.ts.map