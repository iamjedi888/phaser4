import { Vec3Callback } from '../vec3/Vec3Callback';
import { Vec3CallbackType } from '../vec3/Vec3Callback';
export declare class Euler extends Vec3Callback {
    order: string;
    constructor(onChange: Vec3CallbackType, x?: number, y?: number, z?: number, order?: string);
    reorder(order: string): this;
}
//# sourceMappingURL=Euler.d.ts.map