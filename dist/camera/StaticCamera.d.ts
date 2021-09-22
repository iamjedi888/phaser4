import { BaseCamera } from './BaseCamera';
import { IStaticCamera } from './IStaticCamera';
export declare class StaticCamera extends BaseCamera implements IStaticCamera {
    readonly type: string;
    constructor(width: number, height: number);
    preRender(): boolean;
}
//# sourceMappingURL=StaticCamera.d.ts.map