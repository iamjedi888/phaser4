import { Color } from '../../components/color/Color';
import { IGameObject } from '../IGameObject';
import { IRectangle } from '../../geom/rectangle/IRectangle';
import { Texture } from '../../textures/Texture';

export interface IRenderLayer extends IGameObject
{
    color: Color;
    texture: Texture;
    framebuffer: WebGLFramebuffer;
    x: number;
    y: number;
    viewport: IRectangle;
}
