import { IVec2 } from './IVec2';
export declare class Vec2 implements IVec2 {
    x: number;
    y: number;
    constructor(x?: number, y?: number);
    set(x?: number, y?: number): this;
    toArray(dst?: Float32List, index?: number): Float32List;
    fromArray(src: Float32List, index?: number): this;
    toString(): string;
}
//# sourceMappingURL=Vec2.d.ts.map