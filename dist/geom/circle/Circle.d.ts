export declare class Circle {
    x: number;
    y: number;
    private _radius;
    private _diameter;
    constructor(x?: number, y?: number, radius?: number);
    set(x?: number, y?: number, radius?: number): this;
    contains(x: number, y: number): boolean;
    get radius(): number;
    set radius(value: number);
    get diameter(): number;
    set diameter(value: number);
    get left(): number;
    set left(value: number);
    get right(): number;
    set right(value: number);
    get top(): number;
    set top(value: number);
    get bottom(): number;
    set bottom(value: number);
}
//# sourceMappingURL=Circle.d.ts.map