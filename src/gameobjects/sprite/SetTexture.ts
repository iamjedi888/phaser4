import { Frame } from '../../textures/Frame';
import { GetTexture } from '../../textures/GetTexture';
import { ISprite } from './ISprite';
import { SetFrame } from './SetFrame';
import { Texture } from '../../textures/Texture';

export function SetTexture <T extends ISprite> (key: string | Texture | Frame, frame: string | number | Frame, ...children: T[]): T[]
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
            texture = GetTexture(key);
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
