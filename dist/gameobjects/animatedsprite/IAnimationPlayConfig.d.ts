import { IAnimatedSprite } from './IAnimatedSprite';
export interface IAnimationPlayConfig {
    speed?: number;
    repeat?: number;
    yoyo?: boolean;
    startFrame?: number;
    delay?: number;
    repeatDelay?: number;
    forceRestart?: boolean;
    onStart?: (sprite: IAnimatedSprite, animation: string) => void;
    onRepeat?: (sprite: IAnimatedSprite, animation: string) => void;
    onComplete?: (sprite: IAnimatedSprite, animation: string) => void;
}
//# sourceMappingURL=IAnimationPlayConfig.d.ts.map