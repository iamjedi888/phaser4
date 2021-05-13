import { Texture } from './Texture';
import { TextureManagerInstance } from './TextureManagerInstance';

export function GetTexture (key: string): Texture
{
    return TextureManagerInstance.get().get(key);
}
