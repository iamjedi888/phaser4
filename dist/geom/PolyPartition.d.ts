declare type Point = {
    x: number;
    y: number;
};
declare type Contour = Point[];
export declare function RemoveHoles(polygon: Contour, holes: Contour[], doNotCheckOrdering?: boolean): Contour;
export declare function Triangulate(polygon: Contour, doNotCheckOrdering?: boolean): Contour[];
export declare function ConvexPartition(polygon: Contour, doNotCheckOrdering?: boolean): Contour[];
export {};
//# sourceMappingURL=PolyPartition.d.ts.map