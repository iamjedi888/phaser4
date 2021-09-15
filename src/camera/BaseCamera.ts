import { TRANSFORM, Transform2DComponent } from '../components/transform/Transform2DComponent';
import { addEntity, removeComponent, removeEntity } from 'bitecs';

import { AddTransform2DComponent } from '../components/transform/AddTransform2DComponent';
import { GameObjectWorld } from '../GameObjectWorld';
import { IBaseCamera } from './IBaseCamera';
import { IMatrix4 } from '../math/mat4/IMatrix4';
import { Matrix4 } from '../math/mat4/Matrix4';
import { SetBounds } from '../components/transform/SetBounds';
import { Size } from '../components/transform/Size';

export class BaseCamera implements IBaseCamera
{
    readonly id: number = addEntity(GameObjectWorld);

    readonly type: string = 'BaseCamera';

    //  User defined name. Never used internally.
    name: string = '';

    size: Size;

    //  For loading into the shaders
    matrix: IMatrix4;

    isDirty: boolean;

    private _data: Float32Array;

    constructor (width: number, height: number)
    {
        const id = this.id;

        AddTransform2DComponent(id);

        this.matrix = new Matrix4();

        this.size = new Size(id, width, height);

        this._data = Transform2DComponent.data[id];

        this.reset(width, height);
    }

    preRender (): boolean
    {
        return this.isDirty;
    }

    postRender (): void
    {
        this.isDirty = false;
    }

    getBoundsX (): number
    {
        return this._data[TRANSFORM.BOUNDS_X1];
    }

    getBoundsY (): number
    {
        return this._data[TRANSFORM.BOUNDS_Y1];
    }

    getBoundsRight (): number
    {
        return this._data[TRANSFORM.BOUNDS_X2];
    }

    getBoundsBottom (): number
    {
        return this._data[TRANSFORM.BOUNDS_Y2];
    }

    getMatrix (): Float32Array
    {
        return this.matrix.data;
    }

    reset (width: number, height: number): void
    {
        this.size.set(width, height);

        this.isDirty = true;

        SetBounds(this.id, 0, 0, width, height);
    }

    destroy (): void
    {
        const id = this.id;

        removeComponent(GameObjectWorld, Transform2DComponent, id);

        removeEntity(GameObjectWorld, id);
    }
}
