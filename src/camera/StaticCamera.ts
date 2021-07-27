import { IStaticCamera } from './IStaticCamera';
import { IStaticWorld } from '../world/IStaticWorld';
import { Mat4Identity } from '../math/mat4/Mat4Identity';
import { Matrix2D } from '../math/mat2d/Matrix2D';
import { Matrix4 } from '../math/mat4/Matrix4';
import { Rectangle } from '../geom/rectangle/Rectangle';

export class StaticCamera implements IStaticCamera
{
    world: IStaticWorld;
    matrix: Matrix4;
    type: string;

    width: number;
    height: number;
    bounds: Rectangle;

    dirtyRender: boolean;
    worldTransform: Matrix2D;

    constructor (width: number, height: number)
    {
        this.dirtyRender = true;

        this.matrix = Mat4Identity();

        this.bounds = new Rectangle();

        this.worldTransform = new Matrix2D();

        this.reset(width, height);
    }

    reset (width: number, height: number): void
    {
        this.width = width;
        this.height = height;

        this.bounds.set(0, 0, width, height);
    }

    destroy (): void
    {
        this.world = null;
        this.worldTransform = null;
        this.matrix = null;
        this.bounds = null;
    }
}
