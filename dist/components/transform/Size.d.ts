import { IVec2 } from '../../math/vec2/IVec2';
export declare class Size implements IVec2 {
    private id;
    private _data;
    constructor(id: number, width?: number, height?: number);
    set(width: number, height?: number): this;
    set width(value: number);
    get width(): number;
    set height(value: number);
    get height(): number;
    set x(value: number);
    get x(): number;
    set y(value: number);
    get y(): number;
    destroy(): void;
}
//# sourceMappingURL=Size.d.ts.map