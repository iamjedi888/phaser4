export interface ITriangle {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    x3: number;
    y3: number;
    left: number;
    right: number;
    top: number;
    bottom: number;
    set(x1?: number, y1?: number, x2?: number, y2?: number, x3?: number, y3?: number): this;
    contains(x: number, y: number): boolean;
}
//# sourceMappingURL=ITriangle.d.ts.map