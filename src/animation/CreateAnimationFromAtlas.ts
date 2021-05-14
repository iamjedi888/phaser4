import { Animation } from './Animation';
import { AnimationFrame } from './AnimationFrame';
import { GetFramesInRange } from '../textures/GetFramesInRange';
import { GetTexture } from '../textures/GetTexture';
import { IAnimationFromAtlas } from './IAnimationFromAtlasConfig';
import { Texture } from '../textures';

export function CreateAnimationFromAtlas (config: IAnimationFromAtlas): Animation
{
    const texture = (config.texture instanceof Texture) ? config.texture : GetTexture(config.texture as string);

    const frames: AnimationFrame[] = [];

    GetFramesInRange(texture, config).forEach(frame =>
    {
        frames.push(new AnimationFrame(texture, frame));
    });

    return new Animation({ frames, ... config });
}
