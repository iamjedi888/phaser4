import { GameObjectCache } from '../gameobjects/GameObjectCache';
import { GameObjectWorld } from '../GameObjectWorld';
import { IFrame } from './IFrame';
import { ISprite } from '../gameobjects/sprite/ISprite';
import { ITexture } from './ITexture';
import { RemoveTextureFromGameObject } from './RemoveTextureFromGameObject';
import { ReturnTexture } from './ReturnTexture';
import { SetTexture } from './SetTexture';

//  Remove this Texture from all Game Objects that have it assigned
//  Does NOT destroy the Texture
export function RemoveTexture <T extends ITexture, F extends IFrame> (texture: string | T | F, replacementTexture: string | ITexture | IFrame = '__WHITE'): void
{
    const { texture: srcTexture } = ReturnTexture(texture);

    if (srcTexture)
    {
        const eids = srcTexture.inUseQuery(GameObjectWorld);

        eids.forEach(id =>
        {
            const sprite = GameObjectCache.get(id) as ISprite;

            RemoveTextureFromGameObject(sprite);

            if (replacementTexture)
            {
                SetTexture(replacementTexture, null, sprite);
            }
        });
    }
}
