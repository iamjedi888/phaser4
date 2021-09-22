import { IBounds } from '../../components/transform/IBounds';
export declare class SpatialHashGrid {
    cellWidth: number;
    cellHeight: number;
    cells: Map<string, Set<number>>;
    ids: number[];
    index: number;
    getBounds: (id: number) => IBounds;
    constructor(cellWidth: number, cellHeight: number, getBounds?: (id: number) => IBounds);
    clear(): void;
    getX(x: number): number;
    getY(y: number): number;
    getXCeil(x: number): number;
    getYCeil(y: number): number;
    getKey(x: number, y: number): string;
    getGridKey(x: number, y: number): string;
    addToCell(id: number, gridX: number, gridY: number): string;
    inView(x: number, y: number, width: number, height: number): Set<number>;
    intersects(left: number, top: number, right: number, bottom: number): Set<number>;
    add(id: number): void;
    update(id: number): void;
    has(id: number): boolean;
    getAll(): number[];
    remove(id: number): void;
}
//# sourceMappingURL=SpatialHashGrid.d.ts.map