import { Vec4Callback, Vec4CallbackType } from './Vec4Callback';
export declare class RGBACallback extends Vec4Callback {
    constructor(onChange: Vec4CallbackType, r?: number, g?: number, b?: number, a?: number);
    set r(value: number);
    get r(): number;
    set g(value: number);
    get g(): number;
    set b(value: number);
    get b(): number;
    set a(value: number);
    get a(): number;
    toString(): string;
}
//# sourceMappingURL=RGBACallback.d.ts.map