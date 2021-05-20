import { Clamp, DegToRad } from '../math';
import { FORWARD, RIGHT, UP, Vec3, Vec3Callback, Vec3Forward, Vec3Right, Vec3ScaleAndAdd, Vec3TransformMat4Zero, Vec3Up } from '../math/vec3';
import { Mat4FromRotationXYTranslation, Mat4Invert, Mat4LookAt, Mat4Multiply, Mat4Perspective, Mat4TargetTo, Matrix4 } from '../math/mat4';
import { QuatRotationYawPitchRoll, Quaternion } from '../math/quaternion';

import { GameInstance } from '../GameInstance';
import { IRectangle } from '../geom/rectangle/IRectangle';
import { IRenderer } from '../renderer/IRenderer';
import { Rectangle } from '../geom/rectangle';

export class NewCamera3D
{
    type: string;
    renderer: IRenderer;

    position: Vec3Callback;
    rotation: Quaternion;

    matrix: Matrix4; // the transform matrix
    viewMatrix: Matrix4; // the inverse of the transform matrix
    projectionMatrix: Matrix4; // perspective projection matrix
    viewProjectionMatrix: Matrix4; // perspective projection matrix multiplied by the view matrix

    forward: Vec3;
    up: Vec3;
    right: Vec3;

    start: Vec3;

    aspect: number;

    isOrbit: boolean = false;

    minDistance: number = 0;
    maxDistance: number = Infinity;

    minPolarAngle: number = 0;
    maxPolarAngle: number = Math.PI;

    minAzimuthAngle: number = -Infinity;
    maxAzimuthAngle: number = Infinity;

    dirtyRender: boolean = true;

    panRate: number = 5;
    zoomRate: number = 200;
    rotateRate: number = -3;

    viewport: IRectangle;

    private _fov: number;
    private _near: number;
    private _far: number;

    private _yaw: number = 0;
    private _pitch: number = 0;
    private _roll: number = 0;

    constructor (fov: number = 45, near: number = 0.1, far: number = 1000)
    {
        this._fov = fov;
        this._near = near;
        this._far = far;

        this.matrix = new Matrix4();
        this.viewMatrix = new Matrix4();
        this.projectionMatrix = new Matrix4();
        this.viewProjectionMatrix = new Matrix4();

        this.position = new Vec3Callback(() => this.update());
        this.rotation = new Quaternion();

        const game = GameInstance.get();

        const renderer = game.renderer;

        this.viewport = new Rectangle(0, 0, renderer.width, renderer.height);

        this.renderer = renderer;

        this.forward = Vec3Forward();
        this.up = Vec3Up();
        this.right = Vec3Right();

        this.start = new Vec3();

        this.setAspectRatio();
    }

    update (): this
    {
        const matrix = this.matrix;
        const view = this.viewMatrix;

        Mat4FromRotationXYTranslation(this.rotation, this.position, !this.isOrbit, matrix);

        Vec3TransformMat4Zero(FORWARD, matrix, this.forward);
        Vec3TransformMat4Zero(UP, matrix, this.up);
        Vec3TransformMat4Zero(RIGHT, matrix, this.right);

        Mat4Invert(matrix, view);

        Mat4Multiply(this.projectionMatrix, view, this.viewProjectionMatrix);

        return this;
    }

    panX (amount: number): this
    {
        const pos = this.position;

        if (!this.isOrbit)
        {
            Vec3ScaleAndAdd(pos, this.right, amount, pos);
        }

        return this;
    }

    panY (amount: number): this
    {
        const pos = this.position;
        const up = this.up;

        if (this.isOrbit)
        {
            pos.y += up.y * amount;
        }
        else
        {
            Vec3ScaleAndAdd(pos, up, amount, pos);
        }

        return this;
    }

    panZ (amount: number): this
    {
        const pos = this.position;

        if (this.isOrbit)
        {
            pos.z += amount;
        }
        else
        {
            Vec3ScaleAndAdd(pos, this.forward, amount, pos);
        }

        return this;
    }

    begin (x: number, y: number): void
    {
        this.start.set(x, y);
    }

    pan (x: number, y: number): void
    {
        const dx = x - this.start.x;
        const dy = y - this.start.y;
        const viewport = this.viewport;

        this.panX(-dx * (this.panRate / viewport.width));
        this.panY(dy * (this.panRate / viewport.height));

        this.start.set(x, y);
    }

    rotate (x: number, y: number): void
    {
        const dx = x - this.start.x;
        const dy = y - this.start.y;
        const viewport = this.viewport;

        this.rotation.x += dy * (this.rotateRate / viewport.height);
        this.rotation.y += dx * (this.rotateRate / viewport.width);

        this.start.set(x, y);

        this.update();
    }

    zoom (delta: number): void
    {
        this.panZ(Clamp(delta, -1, 1) * (this.zoomRate / this.viewport.height));
    }

    /*
    lookAt (target: IVec3Like, invert: boolean = false): this
    {
        if (invert)
        {
            LookAt(this.position, target, this.up, this.matrix);
        }
        else
        {
            LookAt(target, this.position, this.up, this.matrix);
        }

        GetRotation(this.matrix, this.rotation);

        return this;
    }

    targetTo (target: IVec3Like): this
    {
        // TargetTo(this.direction, target, this.up, this.matrix);

        GetRotation(this.matrix, this.rotation);

        return this;
    }
    */

    setAspectRatio (value?: number): this
    {
        if (!value)
        {
            const renderer = this.renderer;

            value = renderer.width / renderer.height;
        }

        this.aspect = value;

        return this.updateProjectionMatrix();
    }

    updateProjectionMatrix (): this
    {
        Mat4Perspective(DegToRad(this._fov), this.aspect, this._near, this._far, this.projectionMatrix);

        return this;
    }

    get fov (): number
    {
        return this._fov;
    }

    set fov (value: number)
    {
        this._fov = Clamp(value, 0, 180);

        this.updateProjectionMatrix();
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

    get yaw (): number
    {
        return this._yaw;
    }

    set yaw (value: number)
    {
        this._yaw = value;

        QuatRotationYawPitchRoll(value, this._pitch, this._roll, this.rotation);
    }

    get pitch (): number
    {
        return this._pitch;
    }

    set pitch (value: number)
    {
        this._pitch = value;

        QuatRotationYawPitchRoll(this._yaw, value, this._roll, this.rotation);
    }

    get roll (): number
    {
        return this._roll;
    }

    set roll (value: number)
    {
        this._roll = value;

        QuatRotationYawPitchRoll(this._yaw, this._pitch, value, this.rotation);
    }
}
