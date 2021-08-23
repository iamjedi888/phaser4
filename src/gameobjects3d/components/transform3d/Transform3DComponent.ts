import { Mat4FromRotationTranslationScale, Mat4Invert, Mat4Transpose, Matrix4 } from '../../../math/mat4';
import { QuatRotateX, QuatRotateY, QuatRotateZ, Quaternion } from '../../../math/quaternion';
import { Vec3, Vec3Callback, Vec3Forward, Vec3Right, Vec3Up } from '../../../math/vec3';

import { DIRTY_CONST } from '../../../gameobjects/DIRTY_CONST';
import { IGameObject3D } from '../../IGameObject3D';

export class Transform3DComponent
{
    entity: IGameObject3D;

    local: Matrix4;
    world: Matrix4;
    normal: Matrix4;

    position: Vec3Callback;
    scale: Vec3Callback;
    origin: Vec3Callback;
    rotation: Quaternion;

    forward: Vec3;
    up: Vec3;
    right: Vec3;

    passthru: boolean = false;

    constructor (entity: IGameObject3D, x: number = 0, y: number = 0, z: number = 0)
    {
        this.entity = entity;

        this.local = new Matrix4();
        this.world = new Matrix4();
        this.normal = new Matrix4();

        this.position = new Vec3Callback(() => this.update(), x, y, z);
        this.scale = new Vec3Callback(() => this.update(), 1, 1, 1);
        this.origin = new Vec3Callback(() => this.update());
        this.rotation = new Quaternion();

        this.rotation.onChange = () => this.update();

        this.forward = Vec3Forward();
        this.up = Vec3Up();
        this.right = Vec3Right();

        this.update();
    }

    rotateX (angle: number): void
    {
        QuatRotateX(this.rotation, angle, this.rotation);
    }

    rotateY (angle: number): void
    {
        QuatRotateY(this.rotation, angle, this.rotation);
    }

    rotateZ (angle: number): void
    {
        QuatRotateZ(this.rotation, angle, this.rotation);
    }

    update (): void
    {
        const model = this.local;
        const normal = this.normal;

        Mat4FromRotationTranslationScale(this.rotation, this.position, this.scale, model);

        Mat4Invert(model, normal);
        Mat4Transpose(normal, normal);
    }

    updateLocal (): void
    {
        this.entity.setDirty(DIRTY_CONST.TRANSFORM, DIRTY_CONST.BOUNDS);

        // UpdateLocalTransform(this);
    }

    updateWorld (): void
    {
        const entity = this.entity;

        entity.setDirty(DIRTY_CONST.TRANSFORM, DIRTY_CONST.BOUNDS);

        // UpdateWorldTransform(entity);

        if (entity.numChildren)
        {
            this.updateChildren();
        }
    }

    updateChildren (): void
    {
        //  Sweep all children - by this point our local and world transforms are correct
        const children = this.entity.children;

        for (let i = 0; i < children.length; i++)
        {
            const child = children[i];

            // child.transform.updateWorld();
        }
    }

    destroy (): void
    {
        this.position.destroy();
        this.scale.destroy();
        this.origin.destroy();
        this.rotation.destroy();

        this.entity = null;
        this.local = null;
        this.world = null;
        this.position = null;
        this.scale = null;
        this.origin = null;
        this.rotation = null;
    }
}
