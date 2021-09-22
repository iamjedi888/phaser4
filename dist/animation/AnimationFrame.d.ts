import { IAnimationFrame } from './IAnimationFrame';
import { IFrame } from '../textures/IFrame';
import { ITexture } from '../textures/ITexture';
export declare class AnimationFrame implements IAnimationFrame {
    texture: ITexture;
    frame: IFrame;
    isFirst: boolean;
    isLast: boolean;
    isKeyFrame: boolean;
    nextFrame: IAnimationFrame;
    prevFrame: IAnimationFrame;
    duration: number;
    progress: number;
    constructor(texture: ITexture, frame: IFrame);
    destroy(): void;
}
//# sourceMappingURL=AnimationFrame.d.ts.map