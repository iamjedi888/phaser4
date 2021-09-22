export declare class Quaternion {
    private _x;
    private _y;
    private _z;
    private _w;
    onChange: (quat: Quaternion) => void;
    constructor(x?: number, y?: number, z?: number, w?: number);
    set(x?: number, y?: number, z?: number, w?: number): this;
    set x(value: number);
    get x(): number;
    set y(value: number);
    get y(): number;
    set z(value: number);
    get z(): number;
    set w(value: number);
    get w(): number;
    toArray(dst?: Float32List, index?: number): Float32List;
    fromArray(src: Float32List, index?: number): this;
    destroy(): void;
    toString(): string;
}
//# sourceMappingURL=Quaternion.d.ts.map