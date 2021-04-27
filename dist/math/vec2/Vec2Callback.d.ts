import { IVec2Like } from './IVec2Like';
export declare type Vec2CallbackType = (vec2: Vec2Callback) => void;
export declare class Vec2Callback implements IVec2Like {
    private _x;
    private _y;
    onChange: Vec2CallbackType;
    constructor(onChange: Vec2CallbackType, x?: number, y?: number);
    destroy(): void;
    set(x?: number, y?: number): this;
    get x(): number;
    set x(value: number);
    get y(): number;
    set y(value: number);
    toArray(dst?: Float32List, index?: number): Float32List;
    fromArray(src: Float32List, index?: number): this;
    toString(): string;
}
//# sourceMappingURL=Vec2Callback.d.ts.map