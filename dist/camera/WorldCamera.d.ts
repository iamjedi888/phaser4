import { BaseCamera } from './BaseCamera';
import { IWorldCamera } from './IWorldCamera';
import { Position } from '../components/transform/Position';
export declare class WorldCamera extends BaseCamera implements IWorldCamera {
    readonly type: string;
    position: Position;
    constructor(width: number, height: number);
    set x(value: number);
    get x(): number;
    set y(value: number);
    get y(): number;
    setPosition(x: number, y?: number): this;
    preRender(): boolean;
}
//# sourceMappingURL=WorldCamera.d.ts.map