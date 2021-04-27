import { IRenderer } from '../renderer/IRenderer';
import { IStaticCamera } from './IStaticCamera';
import { IStaticWorld } from '../world/IStaticWorld';
import { Matrix2D } from '../math/mat2d/Matrix2D';
import { Matrix4 } from '../math/mat4/Matrix4';
import { Rectangle } from '../geom/rectangle/Rectangle';
export declare class StaticCamera implements IStaticCamera {
    world: IStaticWorld;
    matrix: Matrix4;
    renderer: IRenderer;
    type: string;
    width: number;
    height: number;
    bounds: Rectangle;
    dirtyRender: boolean;
    worldTransform: Matrix2D;
    constructor();
    reset(): void;
    destroy(): void;
}
//# sourceMappingURL=StaticCamera.d.ts.map