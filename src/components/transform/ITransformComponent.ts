import { Vec2, Vec2Callback } from '../../../math/vec2';

import { IGameObject } from '../../IGameObject';
import { Matrix2D } from '../../../math/mat2d/Matrix2D';
import { Rectangle } from '../../../geom/rectangle';

export interface ITransformComponent
{
    entity: IGameObject;
    local: Matrix2D;
    world: Matrix2D;
    position: Vec2Callback;
    scale: Vec2Callback;
    skew: Vec2Callback;
    origin: Vec2Callback;
    rotation: number;
    extent: Rectangle;
    passthru: boolean;
    update (): void;
    updateLocal (): void;
    updateWorld (): void;
    updateChildren (): void;
    globalToLocal (x: number, y: number, out?: Vec2): Vec2;
    localToGlobal (x: number, y: number, out?: Vec2): Vec2;
    setExtent (x: number, y: number, width: number, height: number): void;
    updateExtent (width?: number, height?: number): void;
    destroy (): void;
}
