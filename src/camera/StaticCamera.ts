import { addEntity, removeComponent, removeEntity } from 'bitecs';

import { AddBoundsComponent } from '../components/bounds/AddBoundsComponent';
import { AddMatrix4Component } from '../math/mat4/AddMatrix4Component';
import { BoundsComponent } from '../components/bounds/BoundsComponent';
import { GameObjectWorld } from '../GameObjectWorld';
import { IStaticCamera } from './IStaticCamera';
import { Matrix4Component } from '../math/mat4/Matrix4Component';
import { SetBounds } from '../components/bounds/SetBounds';

export class StaticCamera implements IStaticCamera
{
    readonly id: number = addEntity(GameObjectWorld);

    readonly type: string = 'StaticCamera';

    //  User defined name. Never used internally.
    name: string = '';

    constructor (width: number, height: number)
    {
        const id = this.id;

        AddMatrix4Component(id);
        AddBoundsComponent(id);

        this.reset(width, height);
    }

    getBoundsX (): number
    {
        return BoundsComponent.x[this.id];
    }

    getBoundsY (): number
    {
        return BoundsComponent.y[this.id];
    }

    getBoundsRight (): number
    {
        return BoundsComponent.right[this.id];
    }

    getBoundsBottom (): number
    {
        return BoundsComponent.bottom[this.id];
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
        removeComponent(GameObjectWorld, BoundsComponent, id);

        removeEntity(GameObjectWorld, id);
    }
}
