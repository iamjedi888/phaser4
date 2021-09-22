import { IVec2 } from '../../math/vec2/IVec2';
export declare class Origin implements IVec2 {
    private id;
    private _x;
    private _y;
    private _data;
    constructor(id: number, x?: number, y?: number);
    set(x: number, y?: number): this;
    set x(value: number);
    get x(): number;
    set y(value: number);
    get y(): number;
    destroy(): void;
}
//# sourceMappingURL=Origin.d.ts.map