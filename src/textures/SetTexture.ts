import { GameObjectWorld } from '../GameObjectWorld';
import { IFrame } from './IFrame';
import { ISprite } from '../gameobjects/sprite/ISprite';
import { ITexture } from './ITexture';
import { RemoveTextureFromGameObject } from './RemoveTextureFromGameObject';
import { ReturnTexture } from './ReturnTexture';
import { SetFrame } from './SetFrame';
import { addComponent } from 'bitecs';

export function SetTexture <S extends ISprite, T extends ITexture, F extends IFrame> (texture: string | T | F, frame: string | number | F, ...children: S[]): S[]
{
    const { texture: srcTexture, frame: srcFrame } = ReturnTexture(texture, frame);

    children.forEach(child =>
    {
        if (child.hasTexture)
        {
            RemoveTextureFromGameObject(child);
        }

        child.texture = srcTexture;

        addComponent(GameObjectWorld, srcTexture.tag, child.id);
    });

    SetFrame(srcTexture, srcFrame, ...children);

    return children;
}
