import { Vec3Callback, Vec3CallbackType } from './Vec3Callback';
export declare class RGBCallback extends Vec3Callback {
    constructor(onChange: Vec3CallbackType, r?: number, g?: number, b?: number);
    set r(value: number);
    get r(): number;
    set g(value: number);
    get g(): number;
    set b(value: number);
    get b(): number;
    toString(): string;
}
//# sourceMappingURL=RGBCallback.d.ts.map