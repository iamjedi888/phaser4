import { AddEntity, GameObjectStore, RemoveEntity, TRANSFORM } from '../gameobjects/GameObjectStore';

import { IMatrix4 } from '../math/mat4/IMatrix4';
import { IStaticCamera } from './IStaticCamera';
import { Matrix4 } from '../math/mat4/Matrix4';
import { SetBounds } from '../components/transform/SetBounds';
import { SetTransform2DComponent } from '../components/transform/SetTransform2DComponent';

export class StaticCamera implements IStaticCamera
{
    readonly id: number = AddEntity();

    readonly type: string = 'StaticCamera';

    //  User defined name. Never used internally.
    name: string = '';

    isDirty: boolean = true;

    matrix: IMatrix4;

    constructor (width: number, height: number)
    {
        const id = this.id;

        SetTransform2DComponent(id, 0, 0, 0, 0);

        this.matrix = new Matrix4();

        this.reset(width, height);
    }

    getBoundsX (): number
    {
        return GameObjectStore.f32[this.id][TRANSFORM.BOUNDS_X1];
    }

    getBoundsY (): number
    {
        return GameObjectStore.f32[this.id][TRANSFORM.BOUNDS_Y1];
    }

    getBoundsRight (): number
    {
        return GameObjectStore.f32[this.id][TRANSFORM.BOUNDS_X2];
    }

    getBoundsBottom (): number
    {
        return GameObjectStore.f32[this.id][TRANSFORM.BOUNDS_Y2];
    }

    getMatrix (): Float32Array
    {
        return this.matrix.data;
    }

    updateBounds (): boolean
    {
        this.isDirty = true;

        return true;
    }

    update (): boolean
    {
        return false;
    }

    reset (width: number, height: number): void
    {
        SetBounds(this.id, 0, 0, width, height);
    }

    destroy (): void
    {
        RemoveEntity(this.id);
    }
}
