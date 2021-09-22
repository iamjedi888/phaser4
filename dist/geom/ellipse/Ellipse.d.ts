export declare class Ellipse {
    x: number;
    y: number;
    width: number;
    height: number;
    constructor(x?: number, y?: number, width?: number, height?: number);
    set(x?: number, y?: number, width?: number, height?: number): this;
    contains(x: number, y: number): boolean;
    getMinorRadius(): number;
    getMajorRadius(): number;
    get left(): number;
    set left(value: number);
    get right(): number;
    set right(value: number);
    get top(): number;
    set top(value: number);
    get bottom(): number;
    set bottom(value: number);
}
//# sourceMappingURL=Ellipse.d.ts.map