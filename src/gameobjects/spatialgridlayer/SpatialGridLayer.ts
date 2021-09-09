import { ClearDirtyDisplayList } from '../../components/dirty/ClearDirtyDisplayList';
import { GameObject } from '../GameObject';
import { GameObjectCache } from '../GameObjectCache';
import { HasDirtyTransform } from '../../components/dirty/HasDirtyTransform';
import { IGameObject } from '../IGameObject';
import { IRenderPass } from '../../renderer/webgl1/renderpass/IRenderPass';
import { SetCustomDisplayList } from '../../components/permissions/SetCustomDisplayList';
import { SetDirtyDisplayList } from '../../components/dirty/SetDirtyDisplayList';
import { SetWillTransformChildren } from '../../components/permissions/SetWillTransformChildren';
import { SetWillUpdateChildren } from '../../components/permissions/SetWillUpdateChildren';
import { SpatialHashGrid } from '../../math/spatialgrid/SpatialHashGrid';

export class SpatialGridLayer extends GameObject
{
    readonly type: string = 'SpatialGridLayer';

    hash: SpatialHashGrid;

    constructor (cellWidth: number = 512, cellHeight: number = 512, updateChildren: boolean = false)
    {
        super();

        this.hash = new SpatialHashGrid(cellWidth, cellHeight);

        const id = this.id;

        SetCustomDisplayList(id, true);
        SetWillTransformChildren(id, false);
        SetWillUpdateChildren(id, updateChildren);
    }

    getChildren <T extends IRenderPass> (renderPass?: T): IGameObject[]
    {
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

        ClearDirtyDisplayList(this.id);

        return result;
    }

    onAddChild (childID: number): void
    {
        //  We only add it directly to the hash if its transform is clean.
        //  As it will be added by `onUpdateChild` as part of the World.preRender step if its transform is dirty.
        if (!HasDirtyTransform(childID))
        {
            this.hash.add(childID);
        }

        SetDirtyDisplayList(this.id);
    }

    onUpdateChild (childID: number): void
    {
        this.hash.update(childID);
    }

    onRemoveChild (childID: number): void
    {
        this.hash.remove(childID);

        SetDirtyDisplayList(this.id);
    }

    destroy (reparentChildren?: IGameObject): void
    {
        this.hash.clear();

        super.destroy(reparentChildren);
    }
}
