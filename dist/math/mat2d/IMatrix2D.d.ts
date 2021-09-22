export interface IMatrix2D {
    a: number;
    b: number;
    c: number;
    d: number;
    tx: number;
    ty: number;
    set(a: number, b: number, c: number, d: number, tx: number, ty: number): this;
    identity(): this;
    toArray(): number[];
    fromArray(src: number[]): this;
}
//# sourceMappingURL=IMatrix2D.d.ts.map