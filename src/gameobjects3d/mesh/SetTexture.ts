import { Frame } from '../../textures/Frame';
import { IMesh } from './IMesh';
import { SetFrame } from './SetFrame';
import { Texture } from '../../textures/Texture';
import { TextureManagerInstance } from '../../textures/TextureManagerInstance';

export function SetTexture <T extends IMesh> (key: string | Texture, frame: string | number | Frame, ...children: T[]): T[]
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

        if (key instanceof Texture)
        {
            texture = key;
        }
        else
        {
            texture = TextureManagerInstance.get().get(key);
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
