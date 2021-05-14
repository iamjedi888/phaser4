import { IAnimation } from '../../animation/IAnimation';
import { IAnimationData } from '../../animation/IAnimationData';
import { IAnimationFrame } from '../../animation/IAnimationFrame';
import { ISprite } from '../sprite/ISprite';

export interface IAnimatedSprite extends ISprite
{
    currentAnimation: IAnimation;
    currentFrame: IAnimationFrame;

    animData: IAnimationData;

    hasStarted: boolean;
    forward: boolean;
    inReverse: boolean;
}
