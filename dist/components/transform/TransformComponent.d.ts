import { Vec2, Vec2Callback } from '../../math/vec2';
import { IGameObject } from '../../gameobjects/IGameObject';
import { ITransformComponent } from './ITransformComponent';
import { Matrix2D } from '../../math/mat2d/Matrix2D';
import { Rectangle } from '../../geom/rectangle';
export declare class TransformComponent implements ITransformComponent {
    entity: IGameObject;
    local: Matrix2D;
    world: Matrix2D;
    position: Vec2Callback;
    scale: Vec2Callback;
    skew: Vec2Callback;
    origin: Vec2Callback;
    extent: Rectangle;
    passthru: boolean;
    private _rotation;
    constructor(entity: IGameObject, x?: number, y?: number);
    update(): void;
    updateLocal(): void;
    updateWorld(): void;
    updateChildren(): void;
    globalToLocal(x: number, y: number, out?: Vec2): Vec2;
    localToGlobal(x: number, y: number, out?: Vec2): Vec2;
    setExtent(x: number, y: number, width: number, height: number): void;
    updateExtent(width?: number, height?: number): void;
    set rotation(value: number);
    get rotation(): number;
    destroy(): void;
}
//# sourceMappingURL=TransformComponent.d.ts.map