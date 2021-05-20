import { IGameObject } from '../IGameObject';
import { Matrix2D } from '../../math/mat2d/Matrix2D';
import { Rectangle } from '../../geom/rectangle/Rectangle';
import { Vec2 } from '../../math/vec2/Vec2';

export interface IContainer extends IGameObject
{
    // bounds: IBoundsComponent;
    // input: IInputComponent;
    // vertices: Vertex[];

    localTransform: Matrix2D;
    worldTransform: Matrix2D;
    transformExtent: Rectangle;

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

    getBounds (): Rectangle;

    updateTransform (flag: number, value: number): void;
    updateLocalTransform (): void;
    updateWorldTransform (): void;
    updateExtent (width?: number, height?: number): void;
    setExtent (x: number, y: number, width: number, height: number): void;

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

    // setAlpha (value?: number): this;
}
