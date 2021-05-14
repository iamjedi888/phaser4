import { CalculateDuration } from './CalculateDuration';
import { IAnimation } from './IAnimation';
import { IAnimationFrame } from './IAnimationFrame';
import { LinkFrames } from './LinkFrames';

export function AddFrames (animation: IAnimation, ...frames: IAnimationFrame[]): IAnimation
{
    frames.forEach(frame =>
    {
        animation.frames.add(frame);
    });

    CalculateDuration(animation, animation.frameRate);

    return LinkFrames(animation);
}
