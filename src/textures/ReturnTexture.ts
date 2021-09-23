import { Frame } from './Frame';
import { GetTexture } from './GetTexture';
import { IFrame } from './IFrame';
import { ITexture } from './ITexture';
import { Texture } from './Texture';

export function ReturnTexture <T extends ITexture, F extends IFrame>  (key: string | T | F, frame?: string | number | IFrame): { texture: Texture, frame: Frame }
{
    let texture: Texture;

    if (key instanceof Frame)
    {
        frame = key.key;
        texture = key.texture;
    }
    else if (key instanceof Texture)
    {
        texture = key;
    }
    else
    {
        texture = GetTexture(key as string);
    }

    if (!texture)
    {
        console.warn(`Invalid Texture key: ${key as string}`);
    }
    else
    {
        return { texture, frame: texture.getFrame(frame) };
    }
}
