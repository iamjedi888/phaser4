import { ICamera } from './ICamera';
import { IRenderer } from '../renderer/IRenderer';
import { IWorld } from '../world/IWorld';
import { Matrix2D } from '../math/mat2d/Matrix2D';
import { Matrix4 } from '../math/mat4/Matrix4';
import { Rectangle } from '../geom/rectangle/Rectangle';
import { Vec2Callback } from '../math/vec2/Vec2Callback';
export declare class Camera implements ICamera {
    world: IWorld;
    matrix: Matrix4;
    renderer: IRenderer;
    type: string;
    width: number;
    height: number;
    bounds: Rectangle;
    dirtyRender: boolean;
    worldTransform: Matrix2D;
    position: Vec2Callback;
    scale: Vec2Callback;
    origin: Vec2Callback;
    private _rotation;
    constructor();
    updateTransform(): void;
    reset(): void;
    set rotation(value: number);
    get rotation(): number;
    destroy(): void;
}
//# sourceMappingURL=Camera.d.ts.map