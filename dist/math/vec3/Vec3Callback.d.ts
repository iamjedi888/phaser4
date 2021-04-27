import { IVec3Like } from './IVec3Like';
export declare type Vec3CallbackType = (vec3: Vec3Callback) => void;
export declare class Vec3Callback implements IVec3Like {
    private _x;
    private _y;
    private _z;
    onChange: Vec3CallbackType;
    constructor(onChange: Vec3CallbackType, x?: number, y?: number, z?: number);
    destroy(): void;
    set(x?: number, y?: number, z?: number): this;
    get x(): number;
    set x(value: number);
    get y(): number;
    set y(value: number);
    get z(): number;
    set z(value: number);
    toArray(dst?: Float32List, index?: number): Float32List;
    fromArray(src: Float32List, index?: number): this;
    toString(): string;
}
//# sourceMappingURL=Vec3Callback.d.ts.map