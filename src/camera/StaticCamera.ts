import { TRANSFORM, Transform2DComponent } from '../components/transform/Transform2DComponent';
import { addEntity, removeComponent, removeEntity } from 'bitecs';

import { AddMatrix4Component } from '../math/mat4/AddMatrix4Component';
import { AddTransform2DComponent } from '../components/transform/AddTransform2DComponent';
import { GameObjectWorld } from '../GameObjectWorld';
import { IStaticCamera } from './IStaticCamera';
import { Matrix4Component } from '../math/mat4/Matrix4Component';
import { SetBounds } from '../components/transform/SetBounds';

export class StaticCamera implements IStaticCamera
{
    readonly id: number = addEntity(GameObjectWorld);

    readonly type: string = 'StaticCamera';

    //  User defined name. Never used internally.
    name: string = '';

    constructor (width: number, height: number)
    {
        const id = this.id;

        AddTransform2DComponent(id, 0, 0, 0, 0);
        AddMatrix4Component(id);

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
        return Matrix4Component.data[this.id];
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

        removeComponent(GameObjectWorld, Matrix4Component, id);
        removeComponent(GameObjectWorld, Transform2DComponent, id);

        removeEntity(GameObjectWorld, id);
    }
}
