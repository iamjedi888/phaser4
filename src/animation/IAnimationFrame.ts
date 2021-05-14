import { IFrame } from '../textures/IFrame';
import { ITexture } from '../textures/ITexture';

export interface IAnimationFrame
{
    texture: ITexture;
    frame: IFrame;
    isFirst: boolean;
    isLast: boolean;
    isKeyFrame: boolean;
    nextFrame: IAnimationFrame;
    prevFrame: IAnimationFrame;
    duration: number;
    progress: number;
}
