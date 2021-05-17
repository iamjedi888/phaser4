import { IAnimatedSprite } from './IAnimatedSprite';

export function Stop <T extends IAnimatedSprite> (...sprites: T[]): T[]
{
    sprites.forEach(sprite =>
    {
        const data = sprite.animData;

        data.isPlaying = false;
        data.currentAnim = '';

        if (data.onComplete)
        {
            data.onComplete(sprite, sprite.currentAnimation);
        }
    });

    return sprites;
}
