import { GameObject } from '../GameObject';
import { IGameObject } from '../IGameObject';
import { SetWillCacheChildren } from '../../components/permissions/SetWillCacheChildren';
import { SetWillTransformChildren } from '../../components/permissions/SetWillTransformChildren';
import { SpatialHashGrid } from '../../math/spatialgrid/SpatialHashGrid';

export class SpatialGridLayer extends GameObject
{
    readonly type: string = 'SpatialGridLayer';

    hash: SpatialHashGrid;

    constructor (cellWidth: number = 512, cellHeight: number = 512)
    {
        super();

        this.hash = new SpatialHashGrid(cellWidth, cellHeight);

        const id = this.id;

        SetWillTransformChildren(id, false);
        SetWillCacheChildren(id, false);
    }

    onAddChild (child: IGameObject): void
    {
        this.hash.add(child.id);
    }

    onRemoveChild (child: IGameObject): void
    {
        this.hash.remove(child.id);
    }

    destroy (reparentChildren?: IGameObject): void
    {
        this.hash.clear();

        super.destroy(reparentChildren);
    }
}
