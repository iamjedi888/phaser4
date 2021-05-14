import { Frame } from '../../textures/Frame';
import { GetTexture } from '../../textures/GetTexture';
import { IFrame } from '../../textures/IFrame';
import { ISprite } from './ISprite';
import { ITexture } from '../../textures/ITexture';
import { SetFrame } from './SetFrame';
import { Texture } from '../../textures/Texture';

export function SetTexture <T extends ISprite> (key: string | ITexture | IFrame, frame: string | number | IFrame, ...children: T[]): T[]
{
    if (!key)
    {
        //  Remove texture from all children
        children.forEach(child =>
        {
            child.texture = null;
            child.frame = null;
            child.hasTexture = false;
        });
    }
    else
    {
        let texture: Texture;

        if (key instanceof Frame)
        {
            frame = key;
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
            children.forEach(child =>
            {
                child.texture = texture;
            });

            SetFrame(texture, frame, ...children);
        }
    }

    return children;
}
