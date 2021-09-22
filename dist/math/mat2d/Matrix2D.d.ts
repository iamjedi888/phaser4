export declare class Matrix2D {
    a: number;
    b: number;
    c: number;
    d: number;
    tx: number;
    ty: number;
    constructor(a?: number, b?: number, c?: number, d?: number, tx?: number, ty?: number);
    set(a?: number, b?: number, c?: number, d?: number, tx?: number, ty?: number): this;
    identity(): this;
    toArray(): number[];
    fromArray(src: number[]): Matrix2D;
}
//# sourceMappingURL=Matrix2D.d.ts.map