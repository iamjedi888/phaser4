import { CalculateDuration } from './CalculateDuration';
import { IAnimation } from './IAnimation';
import { IAnimationFrame } from './IAnimationFrame';
import { LinkFrames } from './LinkFrames';

export function RemoveFrame (animation: IAnimation, frame: IAnimationFrame): IAnimation
{
    animation.frames.delete(frame);

    CalculateDuration(animation, animation.frameRate);

    return LinkFrames(animation);
}
