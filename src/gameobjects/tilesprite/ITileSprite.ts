import { Frame } from '../../textures/Frame';
import { IContainer } from '../container/IContainer';
import { IFrame } from '../../textures/IFrame';
import { ITexture } from '../../textures/ITexture';
import { IVec2 } from '../../math/vec2/IVec2';
import { Texture } from '../../textures/Texture';

export interface ITileSprite extends IContainer
{
    texture: Texture;
    frame: Frame;
    hasTexture: boolean;
    // tint: number;

    tileScale: IVec2;
    tilePosition: IVec2;

    setTexture (key: string | ITexture | IFrame, frame?: string | number | IFrame): this;
    setFrame (key?: string | number | IFrame): this;
}
