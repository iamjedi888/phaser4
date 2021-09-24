import { GameObjectWorld } from '../GameObjectWorld';
import { IFrame } from './IFrame';
import { ITexture } from './ITexture';
import { ReturnTexture } from './ReturnTexture';

export function GetTextureUseCount <T extends ITexture, F extends IFrame> (texture: string | T | F): number
{
    const { texture: srcTexture } = ReturnTexture(texture);

    return srcTexture.inUseQuery(GameObjectWorld).length;
}
