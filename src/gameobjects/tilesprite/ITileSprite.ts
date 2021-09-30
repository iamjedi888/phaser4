import { Frame } from '../../textures/Frame';
import { IContainer } from '../container/IContainer';
import { IFrame } from '../../textures/IFrame';
import { ITexture } from '../../textures/ITexture';
import { Texture } from '../../textures/Texture';

export interface ITileSprite extends IContainer
{
    texture: Texture;
    frame: Frame;
    hasTexture: boolean;
    // tint: number;
    setTexture (key: string | ITexture | IFrame, frame?: string | number | IFrame): this;
    setFrame (key?: string | number | IFrame): this;
}
