import { TRANSFORM, Transform2DComponent } from '../../components/transform/Transform2DComponent';

import { AddTransform2DComponent } from '../../components/transform/AddTransform2DComponent';
import { GameObject } from '../GameObject';
import { IBaseCamera } from '../../camera/IBaseCamera';
import { IGameObject } from '../IGameObject';
import { SetDirtyTransform } from '../../components/dirty/SetDirtyTransform';
import { SetWillCacheChildren } from '../../components/permissions/SetWillCacheChildren';
import { SetWillTransformChildren } from '../../components/permissions/SetWillTransformChildren';
import { SetWillUpdate } from '../../components/permissions/SetWillUpdate';

export class ParallaxLayer extends GameObject
{
    readonly type: string = 'ParallaxLayer';

    camera: IBaseCamera;

    scrollFactorX: number;
    scrollFactorY: number;

    private _x: number;
    private _y: number;
    private _data: Float32Array;

    constructor (camera: IBaseCamera, x: number = 0, y: number = x)
    {
        super();

        this.camera = camera;
        this.scrollFactorX = x;
        this.scrollFactorY = y;

        const id = this.id;

        AddTransform2DComponent(id);

        this._data = Transform2DComponent.data[id];

        SetWillTransformChildren(id, true);
        SetWillCacheChildren(id, false);
        SetWillUpdate(id, true);
    }

    update (): void
    {
        const camera = this.camera;

        // if (camera.isDirty)
        // {
            // console.log('cam dirty');

            this.x = camera.getBoundsX();
            this.y = camera.getBoundsY();
        // }
    }

    set (x: number, y: number = x): this
    {
        this.x = x;
        this.y = y;

        return this;
    }

    set x (value: number)
    {
        this._x = value;

        this._data[TRANSFORM.X] = value;

        SetDirtyTransform(this.id);
    }

    get x (): number
    {
        return this._x;
    }

    set y (value: number)
    {
        this._y = value;

        this._data[TRANSFORM.Y] = value;

        SetDirtyTransform(this.id);
    }

    get y (): number
    {
        return this._y;
    }

    destroy (reparentChildren?: IGameObject): void
    {
        super.destroy(reparentChildren);

        this._data = null;
    }
}
