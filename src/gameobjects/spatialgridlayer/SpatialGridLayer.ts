import { ClearDirtyDisplayList } from '../../components/dirty/ClearDirtyDisplayList';
import { GameObject } from '../GameObject';
import { GameObjectCache } from '../GameObjectCache';
import { HasDirtyTransform } from '../../components/dirty/HasDirtyTransform';
import { IGameObject } from '../IGameObject';
import { IRenderPass } from '../../renderer/webgl1/renderpass/IRenderPass';
import { SetCustomDisplayList } from '../../components/permissions/SetCustomDisplayList';
import { SetDirtyDisplayList } from '../../components/dirty/SetDirtyDisplayList';
import { SetWillCacheChildren } from '../../components/permissions/SetWillCacheChildren';
import { SetWillTransformChildren } from '../../components/permissions/SetWillTransformChildren';
import { SetWillUpdateChildren } from '../../components/permissions/SetWillUpdateChildren';
import { SpatialHashGrid } from '../../math/spatialgrid/SpatialHashGrid';
import { UpdateTransforms } from '../../components/transform/UpdateTransforms';

export class SpatialGridLayer extends GameObject
{
    readonly type: string = 'SpatialGridLayer';

    hash: SpatialHashGrid;

    constructor (cellWidth: number = 512, cellHeight: number = 512, updateChildren: boolean = false)
    {
        super();

        this.hash = new SpatialHashGrid(cellWidth, cellHeight);

        const id = this.id;

        SetWillTransformChildren(id, false);
        SetWillCacheChildren(id, true);
        SetCustomDisplayList(id, true);
        SetWillUpdateChildren(id, updateChildren);
    }

    getChildren <T extends IRenderPass> (renderPass?: T): IGameObject[]
    {
        const start = performance.now();

        const camera = renderPass.current2DCamera;

        const cx = camera.getBoundsX();
        const cy = camera.getBoundsY();
        const cright = camera.getBoundsRight();
        const cbottom = camera.getBoundsBottom();

        const childIDs = this.hash.intersects(cx, cy, cright, cbottom);

        const result: IGameObject[] = [];

        childIDs.forEach(id =>
        {
            result.push(GameObjectCache.get(id));
        });

        window['gc'] = performance.now() - start;

        ClearDirtyDisplayList(this.id);

        return result;
    }

    onAddChild (child: IGameObject): void
    {
        if (HasDirtyTransform(child.id))
        {
            const max = Number.MAX_SAFE_INTEGER;

            UpdateTransforms(child.id, 0, 0, max, max, true);
        }

        this.hash.add(child.id);

        SetDirtyDisplayList(this.id);
    }

    onRemoveChild (child: IGameObject): void
    {
        this.hash.remove(child.id);

        SetDirtyDisplayList(this.id);
    }

    destroy (reparentChildren?: IGameObject): void
    {
        this.hash.clear();

        super.destroy(reparentChildren);
    }
}
