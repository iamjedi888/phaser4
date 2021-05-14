import { IAnimatedSprite } from '../gameobjects/animatedsprite/IAnimatedSprite';
import { IAnimation } from './IAnimation';

export interface IPlayAnimationConfig
{
    frameRate?: number;
    duration?: number;
    delay?: number;
    repeat?: number;
    repeatDelay?: number;
    stopAfter?: number;
    yoyo?: boolean;
    hold?: boolean;
    showOnStart?: boolean;
    hideOnComplete?: boolean;
    startFrame?: number;
    timeScale?: number;
    onStart?: (sprite: IAnimatedSprite, animation: IAnimation) => void;
    onRepeat?: (sprite: IAnimatedSprite, animation: IAnimation) => void;
    onComplete?: (sprite: IAnimatedSprite, animation: IAnimation) => void;
}
