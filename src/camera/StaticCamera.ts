import { TRANSFORM, Transform2DComponent } from '../components/transform/Transform2DComponent';
import { addEntity, removeComponent, removeEntity } from 'bitecs';

import { AddTransform2DComponent } from '../components/transform/AddTransform2DComponent';
import { GameObjectWorld } from '../GameObjectWorld';
import { IMatrix4 } from '../math/mat4/IMatrix4';
import { IStaticCamera } from './IStaticCamera';
import { Matrix4 } from '../math/mat4/Matrix4';
import { SetBounds } from '../components/transform/SetBounds';

export class StaticCamera implements IStaticCamera
{
    readonly id: number = addEntity(GameObjectWorld);

    readonly type: string = 'StaticCamera';

    //  User defined name. Never used internally.
    name: string = '';

    isDirty: boolean = true;

    matrix: IMatrix4;

    constructor (width: number, height: number)
    {
        const id = this.id;

        AddTransform2DComponent(id, 0, 0, 0, 0);

        this.matrix = new Matrix4();

        this.reset(width, height);
    }

    getBoundsX (): number
    {
        return Transform2DComponent.data[this.id][TRANSFORM.BOUNDS_X1];
    }

    getBoundsY (): number
    {
        return Transform2DComponent.data[this.id][TRANSFORM.BOUNDS_Y1];
    }

    getBoundsRight (): number
    {
        return Transform2DComponent.data[this.id][TRANSFORM.BOUNDS_X2];
    }

    getBoundsBottom (): number
    {
        return Transform2DComponent.data[this.id][TRANSFORM.BOUNDS_Y2];
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
        const id = this.id;

        removeComponent(GameObjectWorld, Transform2DComponent, id);

        removeEntity(GameObjectWorld, id);
    }
}
