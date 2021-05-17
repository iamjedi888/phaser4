import { IAnimatedSprite } from './IAnimatedSprite';
import { IAnimationPlayConfig } from './IAnimationPlayConfig';

export function Play <T extends IAnimatedSprite> (key: string, config: IAnimationPlayConfig = {}, ...sprites: T[]): T[]
{
    const {
        speed = 24,
        repeat = 0,
        yoyo = false,
        startFrame = 0,
        delay = 0,
        repeatDelay = 0,
        onStart = null,
        onRepeat = null,
        onComplete = null,
        forceRestart = false
    } = config;

    sprites.forEach(sprite =>
    {
        const data = sprite.animData;

        if (data.isPlaying)
        {
            if (data.currentAnim !== key)
            {
                //  Stop
                data.isPlaying = false;
                data.currentAnim = '';

                if (data.onComplete)
                {
                    data.onComplete(sprite, sprite.currentAnimation);
                }
            }
            else if (!forceRestart)
            {
                //  This animation is already playing? Just return then.
                return;
            }
        }

        // Does this have an equivalent?
        // if (sprite.anims.has(key))
        // {
        //     data.currentFrames = sprite.anims.get(key);
        //     data.currentAnim = key;
        //     data.frameIndex = startFrame;
        //     data.animSpeed = 1000 / speed;
        //     data.nextFrameTime = data.animSpeed + delay;
        //     data.isPlaying = true;
        //     data.playingForward = true;
        //     data.yoyo = yoyo;
        //     data.repeatCount = repeat;
        //     data.delay = delay;
        //     data.repeatDelay = repeatDelay;
        //     data.onStart = onStart;
        //     data.onRepeat = onRepeat;
        //     data.onComplete = onComplete;

        //     //  If there is no start delay, we set the first frame immediately
        //     if (delay === 0)
        //     {
        //         sprite.setFrame(data.currentFrames[data.frameIndex]);

        //         if (onStart)
        //         {
        //             onStart(sprite, key);
        //         }
        //     }
        //     else
        //     {
        //         data.pendingStart = true;
        //     }
        // }

    });

    return sprites;
}
