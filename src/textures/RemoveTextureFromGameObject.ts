import { GameObjectWorld } from '../GameObjectWorld';
import { ISprite } from '../gameobjects/sprite/ISprite';
import { removeComponent } from 'bitecs';

export function RemoveTextureFromGameObject <T extends ISprite> (sprite: T): void
{
    if (sprite.texture)
    {
        const currentTexture = sprite.texture;

        removeComponent(GameObjectWorld, currentTexture.tag, sprite.id);

        sprite.texture = null;
        sprite.frame = null;
        sprite.hasTexture = false;
    }
}
