import { IVec4Like } from './IVec4Like';
export declare type Vec4CallbackType = (vec4: Vec4Callback) => void;
export declare class Vec4Callback implements IVec4Like {
    private _x;
    private _y;
    private _z;
    private _w;
    onChange: Vec4CallbackType;
    constructor(onChange: Vec4CallbackType, x?: number, y?: number, z?: number, w?: number);
    destroy(): void;
    set(x?: number, y?: number, z?: number, w?: number): this;
    get x(): number;
    set x(value: number);
    get y(): number;
    set y(value: number);
    get z(): number;
    set z(value: number);
    get w(): number;
    set w(value: number);
    toArray(dst?: Float32List, index?: number): Float32List;
    fromArray(src: Float32List, index?: number): this;
    toString(): string;
}
//# sourceMappingURL=Vec4Callback.d.ts.map