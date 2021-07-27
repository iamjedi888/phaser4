import { IMatrix2D } from '../math/mat2d/IMatrix2D';
import { IRectangle } from '../geom/rectangle/IRectangle';
import { IStaticWorld } from '../world/IStaticWorld';
import { Matrix4 } from '../math/mat4/Matrix4';

export interface IStaticCamera
{
    world: IStaticWorld;
    matrix: Matrix4;
    type: string;
    width: number;
    height: number;
    bounds: IRectangle;
    dirtyRender: boolean;
    worldTransform: IMatrix2D;
    reset (width: number, height: number): void;
    destroy (): void;
}
