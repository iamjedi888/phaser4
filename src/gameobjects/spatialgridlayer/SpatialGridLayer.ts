import { ClearDirtyDisplayList } from '../../components/dirty/ClearDirtyDisplayList';
import { GameObject } from '../GameObject';
import { GameObjectCache } from '../GameObjectCache';
import { GetWorldID } from '../../components/hierarchy/GetWorldID';
import { HasDirtyTransform } from '../../components/dirty/HasDirtyTransform';
import { IGameObject } from '../IGameObject';
import { IRenderPass } from '../../renderer/webgl1/renderpass/IRenderPass';
import { SetCustomDisplayList } from '../../components/permissions/SetCustomDisplayList';
import { SetDirtyChildColor } from '../../components/dirty/SetDirtyChildColor';
import { SetDirtyChildTransform } from '../../components/dirty/SetDirtyChildTransform';
import { SetDirtyDisplayList } from '../../components/dirty/SetDirtyDisplayList';
import { SetWillTransformChildren } from '../../components/permissions/SetWillTransformChildren';
import { SetWillUpdateChildren } from '../../components/permissions/SetWillUpdateChildren';
import { SpatialHashGrid } from '../../math/spatialgrid/SpatialHashGrid';

export class SpatialGridLayer extends GameObject
{
    readonly type: string = 'SpatialGridLayer';

    hash: SpatialHashGrid;

    onSortChildren: (a: IGameObject, b: IGameObject) => number;

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
        ClearDirtyDisplayList(this.id);

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

        if (this.onSortChildren)
        {
            result.sort(this.onSortChildren);
        }

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

        const worldID = GetWorldID(this.id);

        SetDirtyDisplayList(this.id);

        SetDirtyChildTransform(worldID);
        SetDirtyChildColor(worldID);
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
