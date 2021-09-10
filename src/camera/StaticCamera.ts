import { TRANSFORM, Transform2DComponent } from '../components/transform/Transform2DComponent';
import { addEntity, removeComponent, removeEntity } from 'bitecs';

import { AddTransform2DComponent } from '../components/transform/AddTransform2DComponent';
import { ClearDirtyTransform } from '../components/dirty/ClearDirtyTransform';
import { GameObjectWorld } from '../GameObjectWorld';
import { HasDirtyTransform } from '../components/dirty/HasDirtyTransform';
import { IMatrix4 } from '../math/mat4/IMatrix4';
import { IStaticCamera } from './IStaticCamera';
import { Matrix4 } from '../math/mat4/Matrix4';
import { SetBounds } from '../components/transform/SetBounds';
import { Size } from '../components/transform/Size';

//  A Static Camera just has a size. It cannot be moved or scaled.

export class StaticCamera implements IStaticCamera
{
    readonly id: number = addEntity(GameObjectWorld);

    readonly type: string = 'WorldCamera';

    //  User defined name. Never used internally.
    name: string = '';

    size: Size;

    //  For loading into the shaders
    matrix: IMatrix4;

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

    updateBounds (): boolean
    {
        const id = this.id;

        if (HasDirtyTransform(id))
        {
            const w = this.size.width;
            const h = this.size.height;

            const ox = (w / 2);
            const oy = (h / 2);

            const bx = ox - (w / 2);
            const by = oy - (h / 2);

            SetBounds(id, bx, by, bx + w, by + h);

            return true;
        }

        return false;
    }

    update (): boolean
    {
        const id = this.id;

        if (HasDirtyTransform(id))
        {
            ClearDirtyTransform(id);

            return true;
        }

        return false;
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
    }

    destroy (): void
    {
        const id = this.id;

        removeComponent(GameObjectWorld, Transform2DComponent, id);

        removeEntity(GameObjectWorld, id);
    }
}
