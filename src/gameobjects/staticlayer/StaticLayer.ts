import { TRANSFORM, Transform2DComponent } from '../../components/transform/Transform2DComponent';

import { AddTransform2DComponent } from '../../components/transform/AddTransform2DComponent';
import { GameObject } from '../GameObject';
import { IBaseCamera } from '../../camera/IBaseCamera';
import { IGameObject } from '../IGameObject';
import { SetDirtyTransform } from '../../components/dirty/SetDirtyTransform';
import { SetFixedTransform } from '../../components/transform/SetFixedTransform';
import { SetWillTransformChildren } from '../../components/permissions/SetWillTransformChildren';

export class StaticLayer extends GameObject
{
    readonly type: string = 'StaticLayer';

    camera: IBaseCamera;

    private _data: Float32Array;

    constructor (camera: IBaseCamera)
    {
        super();

        this.camera = camera;

        const id = this.id;

        AddTransform2DComponent(id);

        SetFixedTransform(id, true);
        SetWillTransformChildren(id, true);

        this._data = Transform2DComponent.data[id];
    }

    update (): void
    {
        const camera = this.camera;

        if (camera.isDirty)
        {
            this._data[TRANSFORM.X] = camera.getBoundsX();
            this._data[TRANSFORM.Y] = camera.getBoundsY();

            SetDirtyTransform(this.id);
        }
    }

    destroy (reparentChildren?: IGameObject): void
    {
        super.destroy(reparentChildren);

        this._data = null;
    }
}
