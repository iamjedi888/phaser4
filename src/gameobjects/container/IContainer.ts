import { IColorComponent } from '../../components/color/IColorComponent';
import { IGameObject } from '../IGameObject';
import { IShader } from '../../renderer/webgl1/shaders/IShader';
import { Origin } from '../../components/transform/Origin';
import { Position } from '../../components/transform/Position';
import { Scale } from '../../components/transform/Scale';
import { Size } from '../../components/transform/Size';
import { Skew } from '../../components/transform/Skew';

export interface IContainer extends IGameObject, IColorComponent
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
    setAlpha (value: number): this;
}
