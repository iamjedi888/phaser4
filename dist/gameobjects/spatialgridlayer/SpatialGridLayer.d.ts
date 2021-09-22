import { GameObject } from '../GameObject';
import { IGameObject } from '../IGameObject';
import { IRenderPass } from '../../renderer/webgl1/renderpass/IRenderPass';
import { SpatialHashGrid } from '../../math/spatialgrid/SpatialHashGrid';
export declare class SpatialGridLayer extends GameObject {
    readonly type: string;
    hash: SpatialHashGrid;
    onSortChildren: (a: IGameObject, b: IGameObject) => number;
    constructor(cellWidth?: number, cellHeight?: number, updateChildren?: boolean);
    getChildren<T extends IRenderPass>(renderPass?: T): IGameObject[];
    onAddChild(childID: number): void;
    onUpdateChild(childID: number): void;
    onRemoveChild(childID: number): void;
    destroy(reparentChildren?: IGameObject): void;
}
//# sourceMappingURL=SpatialGridLayer.d.ts.map