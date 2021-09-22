export declare class Triangle {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    x3: number;
    y3: number;
    constructor(x1?: number, y1?: number, x2?: number, y2?: number, x3?: number, y3?: number);
    set(x1?: number, y1?: number, x2?: number, y2?: number, x3?: number, y3?: number): this;
    contains(x: number, y: number): boolean;
    get left(): number;
    set left(value: number);
    get right(): number;
    set right(value: number);
    get top(): number;
    set top(value: number);
    get bottom(): number;
    set bottom(value: number);
}
//# sourceMappingURL=Triangle.d.ts.map