import { GameObjectCache } from '../gameobjects/GameObjectCache';
import { GameObjectWorld } from '../GameObjectWorld';
import { IFrame } from './IFrame';
import { ISprite } from '../gameobjects/sprite/ISprite';
import { ITexture } from './ITexture';
import { ReturnTexture } from './ReturnTexture';

export function GetSpritesWithTexture <T extends ITexture, F extends IFrame, S extends ISprite> (texture: string | T | F, frame?: string | number | F): S[]
{
    const { texture: srcTexture, frame: srcFrame } = ReturnTexture(texture, frame);

    let children;

    if (srcTexture)
    {
        const eids = srcTexture.inUseQuery(GameObjectWorld);

        children = eids.map(id => GameObjectCache.get(id) as S);

        if (frame && srcFrame)
        {
            children = children.filter(child => child.frame === srcFrame);
        }
    }

    return children;
}
