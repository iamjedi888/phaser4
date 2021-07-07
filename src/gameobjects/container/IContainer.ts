import { Origin, Position, Scale, Size, Skew } from '../../components/transform';

import { IGameObject } from '../IGameObject';
import { IShader } from '../../renderer/webgl1/shaders/IShader';
import { Rectangle } from '../../geom/rectangle/Rectangle';

export interface IContainer extends IGameObject
{
    position: Position;
    scale: Scale;
    skew: Skew;
    origin: Origin;
    size: Size;

    x: number;
    y: number;
    rotation: number;
    alpha: number;

    shader: IShader;

    setPosition (x: number, y?: number): this;
    setScale (x: number, y?: number): this;
    setRotation (value: number): this;
    setSkew (x: number, y: number): this;
    setOrigin (x: number, y: number): this;

    // getBounds (): Rectangle;

    // setAlpha (value?: number): this;
}
