import { CreateAnimData } from './CreateAnimData';
import { IAnimatedSprite } from '../gameobjects/animatedsprite/IAnimatedSprite';
import { IAnimation } from './IAnimation';
import { IPlayAnimationConfig } from './IPlayAnimationConfig';

export function Play <T extends IAnimatedSprite> (animation: IAnimation, config: IPlayAnimationConfig = {}, ...sprites: T[]): T[]
{
    const data = CreateAnimData(
        animation.key,
        animation.frameRate,
        animation.duration,
        animation.delay,
        animation.repeat,
        animation.repeatDelay,
        animation.yoyo,
        animation.hold,
        animation.showOnStart,
        animation.hideOnComplete
    );

    //  Merge in any IPlayAnimationConfig overrides
    Object.assign(data, config);

    data.nextFrameTime = animation.msPerFrame + data.delay;

    sprites.forEach(sprite =>
    {
        if (!sprite || !sprite.animData)
        {
            return;
        }

        const spriteAnimData = sprite.animData;

        //  Call Stop function instead of all this ...
        if (spriteAnimData.isPlaying)
        {
            if (sprite.currentAnimation !== animation)
            {
                spriteAnimData.isPlaying = false;

                if (spriteAnimData.onComplete)
                {
                    spriteAnimData.onComplete(sprite, sprite.currentAnimation);
                }
            }
            else if (!data.forceRestart)
            {
                //  This animation is already playing? Just return then.
                return;
            }
        }

        Object.assign(spriteAnimData, data);

        sprite.currentAnimation = animation;
        sprite.currentFrame = animation.firstFrame;

        sprite.play();
    });

    return sprites;
}
