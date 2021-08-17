import { AddTransform2DComponent, Position, Size, Transform2DComponent } from '../components/transform';
import { addEntity, removeComponent, removeEntity } from 'bitecs';

import { AddBoundsComponent } from '../components/bounds/AddBoundsComponent';
import { AddMatrix4Component } from '../math/mat4/AddMatrix4Component';
import { BoundsComponent } from '../components/bounds/BoundsComponent';
import { GameObjectWorld } from '../GameObjectWorld';
import { IStaticCamera } from './IStaticCamera';
import { Matrix4Component } from '../math/mat4/Matrix4Component';
import { SetBounds } from '../components/bounds/SetBounds';

export class WorldCamera implements IStaticCamera
{
    readonly id: number = addEntity(GameObjectWorld);

    readonly type: string = 'WorldCamera';

    //  User defined name. Never used internally.
    name: string = '';

    size: Size;
    position: Position;

    isDirty: boolean = true;

    constructor (width: number, height: number)
    {
        const id = this.id;

        AddTransform2DComponent(id, 0, 0, 0, 0);
        AddMatrix4Component(id);
        AddBoundsComponent(id);

        this.position = new Position(id, 0, 0);
        this.size = new Size(id, width, height);

        this.reset(width, height);
    }

    set x (value: number)
    {
        this.position.x = value;
        this.isDirty = true;
    }

    get x (): number
    {
        return this.position.x;
    }

    set y (value: number)
    {
        this.position.y = value;
        this.isDirty = true;
    }

    get y (): number
    {
        return this.position.y;
    }

    setPosition (x: number, y?: number): this
    {
        this.position.set(x, y);
        this.isDirty = true;

        return this;
    }

    update (): boolean
    {
        if (this.isDirty)
        {
            const matrix = this.getMatrix();

            const x = this.x;
            const y = this.y;

            const w = this.size.width;
            const h = this.size.height;

            const ox = -x + (w / 2);
            const oy = -y + (h / 2);

            matrix[12] = x;
            matrix[13] = y;

            const bx = ox - (w / 2);
            const by = oy - (h / 2);

            SetBounds(
                this.id,
                bx,
                by,
                bx + w,
                by + h
            );

            this.isDirty = false;

            return true;
        }

        return false;
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

    reset (width: number, height: number): void
    {
        this.size.set(width, height);

        this.isDirty = true;
    }

    destroy (): void
    {
        const id = this.id;

        removeComponent(GameObjectWorld, Transform2DComponent, id);
        removeComponent(GameObjectWorld, Matrix4Component, id);
        removeComponent(GameObjectWorld, BoundsComponent, id);

        removeEntity(GameObjectWorld, id);
    }
}
