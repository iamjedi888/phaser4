import { ITriangle } from './ITriangle';
import { Vec2 } from '../../math/vec2/Vec2';
export declare type TriangleCenterFunction = (triangle: ITriangle) => Vec2;
export declare function CenterTriangleOn(triangle: ITriangle, x: number, y: number, centerFunc?: TriangleCenterFunction): ITriangle;
//# sourceMappingURL=CenterTriangleOn.d.ts.map