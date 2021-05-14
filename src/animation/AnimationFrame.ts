import { IAnimationFrame } from './IAnimationFrame';
import { IFrame } from '../textures/IFrame';
import { ITexture } from '../textures/ITexture';

export class AnimationFrame implements IAnimationFrame
{
    texture: ITexture;
    frame: IFrame;

    isFirst: boolean = false;
    isLast: boolean = false;
    isKeyFrame: boolean = false;

    nextFrame: IAnimationFrame;
    prevFrame: IAnimationFrame;

    duration: number = 0;
    progress: number = 0;

    constructor (texture: ITexture, frame: IFrame)
    {
        this.texture = texture;
        this.frame = frame;
    }

    destroy (): void
    {
        this.texture = null;
        this.frame = null;
        this.nextFrame = null;
        this.prevFrame = null;
    }
}
