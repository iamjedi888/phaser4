export interface IEllipse {
    x: number;
    y: number;
    width: number;
    height: number;
    left: number;
    right: number;
    top: number;
    bottom: number;
    set(x?: number, y?: number, width?: number, height?: number): this;
    contains(x: number, y: number): boolean;
    getMinorRadius(): number;
    getMajorRadius(): number;
}
//# sourceMappingURL=IEllipse.d.ts.map