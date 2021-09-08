import { TRANSFORM, Transform2DComponent } from '../components/transform/Transform2DComponent';
import { addEntity, removeComponent, removeEntity } from 'bitecs';

import { AddTransform2DComponent } from '../components/transform/AddTransform2DComponent';
import { ClearDirtyTransform } from '../components/dirty/ClearDirtyTransform';
import { GameObjectWorld } from '../GameObjectWorld';
import { HasDirtyTransform } from '../components/dirty/HasDirtyTransform';
import { IMatrix4 } from '../math/mat4/IMatrix4';
import { IStaticCamera } from './IStaticCamera';
import { Matrix4 } from '../math/mat4/Matrix4';
import { Position } from '../components/transform/Position';
import { SetBounds } from '../components/transform/SetBounds';
import { Size } from '../components/transform/Size';

export class WorldCamera implements IStaticCamera
{
    readonly id: number = addEntity(GameObjectWorld);

    readonly type: string = 'WorldCamera';

    //  User defined name. Never used internally.
    name: string = '';

    size: Size;
    position: Position;

    isDirty: boolean = true;

    matrix: IMatrix4;

    constructor (width: number, height: number)
    {
        const id = this.id;

        AddTransform2DComponent(id);

        this.matrix = new Matrix4();

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

    updateBounds (): boolean
    {
        const id = this.id;

        if (HasDirtyTransform(id))
        {
            const x = this.x;
            const y = this.y;

            const w = this.size.width;
            const h = this.size.height;

            const ox = -x + (w / 2);
            const oy = -y + (h / 2);

            const bx = ox - (w / 2);
            const by = oy - (h / 2);

            SetBounds(id, bx, by, bx + w, by + h);

            ClearDirtyTransform(id);

            this.isDirty = true;

            return true;
        }

        return false;
    }

    update (): boolean
    {
        if (this.isDirty)
        {
            const data = this.matrix.data;

            data[12] = this.x;
            data[13] = this.y;

            return true;
        }

        return false;
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

    reset (width: number, height: number): void
    {
        this.size.set(width, height);

        this.isDirty = true;
    }

    destroy (): void
    {
        const id = this.id;

        removeComponent(GameObjectWorld, Transform2DComponent, id);

        removeEntity(GameObjectWorld, id);
    }
}
