import { Matrix4 } from '../math/mat4';
import { Vec3, Vec3Callback } from '../math/vec3';
import { IRenderer } from '../renderer/IRenderer';
export declare class Camera3D {
    type: string;
    renderer: IRenderer;
    position: Vec3Callback;
    direction: Vec3Callback;
    up: Vec3;
    left: Vec3;
    aspectRatio: number;
    viewMatrix: Matrix4;
    projectionMatrix: Matrix4;
    dirtyRender: boolean;
    private _lookAtPosition;
    private _lookAtView;
    private _axis;
    private _fov;
    private _near;
    private _far;
    constructor(x?: number, y?: number, z?: number, fov?: number, near?: number, far?: number);
    updateProjectionMatrix(): this;
    lookAt(point: Vec3): this;
    rotateOnAxis(axisVec: Vec3, angle: number): this;
    yaw(angle: number): this;
    pitch(angle: number): this;
    roll(angle: number): this;
    forward(s: number): this;
    update(): this;
    reset(): void;
    destroy(): void;
    get fov(): number;
    set fov(value: number);
    get near(): number;
    set near(value: number);
    get far(): number;
    set far(value: number);
}
//# sourceMappingURL=Camera3D.d.ts.map