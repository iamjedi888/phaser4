import { IGameObject } from '../IGameObject';
import { Vec2 } from '../../math/vec2/Vec2';

export interface IContainer extends IGameObject
{
    x: number;
    y: number;
    width: number;
    height: number;
    rotation: number;
    scaleX: number;
    scaleY: number;
    skewX: number;
    skewY: number;
    originX: number;
    originY: number;
    alpha: number;

    // setAlpha (value?: number): this;

    setSize (width: number, height?: number): this;
    setPosition (x: number, y: number): this;
    setOrigin (x: number, y?: number): this;
    setSkew (x: number, y?: number): this;
    setScale (x: number, y?: number): this;
    setRotation (value: number): this;

    getSize (out?: Vec2): Vec2;
    getPosition (out?: Vec2): Vec2;
    getOrigin (out?: Vec2): Vec2;
    getSkew (out?: Vec2): Vec2;
    getScale (out?: Vec2): Vec2;
    getRotation (): number;
}
