import { Mat4LookAt, Mat4Perspective, Mat4TranslateFromFloats, Matrix4 } from '../math/mat4';
import { QuatSetAxisAngle, Quaternion } from '../math/quaternion';
import { UP, Vec3, Vec3Add, Vec3Callback, Vec3CrossNormalize, Vec3Left, Vec3Normalize, Vec3Subtract, Vec3TransformQuat, Vec3Up } from '../math/vec3';

import { DegToRad } from '../math';
import { GameInstance } from '../GameInstance';
import { IRenderer } from '../renderer/IRenderer';
import { IVec3Like } from '../math/vec3/IVec3Like';

export class Camera3D
{
    type: string;
    renderer: IRenderer;

    position: Vec3Callback;
    direction: Vec3Callback;
    // rotation: Vec3Callback;

    up: Vec3;
    left: Vec3;

    aspectRatio: number;

    // viewport rect

    viewMatrix: Matrix4;
    projectionMatrix: Matrix4;

    dirtyRender: boolean = true;

    private _lookAtPosition: Vec3;
    private _lookAtView: Matrix4;
    private _axis: Quaternion;

    private _fov: number;
    private _near: number;
    private _far: number;

    constructor (x: number = 0, y: number = 0, z: number = 0, fov: number = 45, near: number = 0.1, far: number = 1000)
    {
        const game = GameInstance.get();

        this.renderer = game.renderer;

        this.position = new Vec3Callback(() => this.update(), x, y, z);
        this.direction = new Vec3Callback(() => this.update(), 0, 1, 0);

        this._lookAtPosition = new Vec3();
        this._lookAtView = new Matrix4();
        this._axis = new Quaternion();

        this.up = Vec3Up();
        this.left = Vec3Left();

        this._fov = fov;
        this._near = near;
        this._far = far;
        this.aspectRatio = this.renderer.width / this.renderer.height;

        this.viewMatrix = new Matrix4();
        this.projectionMatrix = Mat4Perspective(DegToRad(fov), this.aspectRatio, near, far);

        this.lookAt(new Vec3());
    }

    updateProjectionMatrix (): this
    {
        Mat4Perspective(DegToRad(this._fov), this.aspectRatio, this._near, this._far, this.projectionMatrix);

        return this;
    }

    lookAt (point: Vec3): this
    {
        const pos = this.position;
        const dir = this.direction;
        const left = this.left;

        Vec3Subtract(point, pos, dir);

        Vec3Normalize(dir, dir);

        Vec3CrossNormalize(UP, dir, left);
        Vec3CrossNormalize(dir, left, this.up);

        return this.update();
    }

    rotateOnAxis (axisVec: Vec3, angle: number): this
    {
        const dir = this.direction;
        const left = this.left;
        const up = this.up;

        const q = QuatSetAxisAngle(axisVec, angle, this._axis);

        Vec3TransformQuat(dir, q, dir);
        Vec3TransformQuat(left, q, left);
        Vec3TransformQuat(up, q, up);

        Vec3Normalize(up, up);
        Vec3Normalize(left, left);
        Vec3Normalize(dir, dir);

        return this.update();
    }

    yaw (angle: number): this
    {
        return this.rotateOnAxis(this.up, angle);
    }

    pitch (angle: number): this
    {
        return this.rotateOnAxis(this.left, angle);
    }

    roll (angle: number): this
    {
        return this.rotateOnAxis(this.direction, angle);
    }

    forward (s: number): this
    {
        const pos = this.position;

        const { x: px, y: py, z: pz } = pos;
        const { x: dx, y: dy, z: dz } = this.direction;

        pos.set(
            px - s * dx,
            py - s * dy,
            pz - s * dz
        );

        return this.update();
    }

    update (): this
    {
        const lookPosition = this._lookAtPosition;
        const lookView = this._lookAtView;
        const pos = this.position;

        Vec3Add(pos, this.direction, lookPosition);

        Mat4LookAt(pos, lookPosition, this.up, lookView);

        Mat4TranslateFromFloats(lookView, -pos.x, -pos.y, -pos.z, this.viewMatrix);

        return this;
    }

    reset (): void
    {
    }

    destroy (): void
    {
        this.position.destroy();
        this.direction.destroy();
        this.up = null;
        this.left = null;
        this.viewMatrix = null;
        this.projectionMatrix = null;
        this._lookAtPosition = null;
        this._lookAtView = null;
        this._axis = null;
    }

    get fov (): number
    {
        return this._fov;
    }

    set fov (value: number)
    {
        if (value > 0 && value < 180)
        {
            this._fov = value;

            this.updateProjectionMatrix();
        }
    }

    get near (): number
    {
        return this._near;
    }

    set near (value: number)
    {
        if (value > 0)
        {
            this._near = value;

            this.updateProjectionMatrix();
        }
    }

    get far (): number
    {
        return this._far;
    }

    set far (value: number)
    {
        if (value > 0)
        {
            this._far = value;

            this.updateProjectionMatrix();
        }
    }

}
