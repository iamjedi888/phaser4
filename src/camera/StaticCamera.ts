import { GameInstance } from '../GameInstance';
import { IRenderer } from '../renderer/IRenderer';
import { IStaticCamera } from './IStaticCamera';
import { IStaticWorld } from '../world/IStaticWorld';
import { Mat4Identity } from '../math/mat4';
import { Matrix2D } from '../math/mat2d/Matrix2D';
import { Matrix4 } from '../math/mat4/Matrix4';
import { Rectangle } from '../geom/rectangle/Rectangle';

export class StaticCamera implements IStaticCamera
{
    world: IStaticWorld;
    matrix: Matrix4;
    renderer: IRenderer;
    type: string;

    width: number;
    height: number;
    bounds: Rectangle;

    dirtyRender: boolean;
    worldTransform: Matrix2D;

    constructor ()
    {
        this.dirtyRender = true;

        const game = GameInstance.get();

        this.renderer = game.renderer;

        this.matrix = Mat4Identity();

        this.bounds = new Rectangle();

        this.worldTransform = new Matrix2D();

        this.reset();
    }

    reset (): void
    {
        const renderer = this.renderer;

        if (renderer)
        {
            const width = renderer.width;
            const height = renderer.height;

            this.width = width;
            this.height = height;
        }

        this.bounds.set(0, 0, this.width, this.height);
    }

    destroy (): void
    {
        this.world = null;
        this.worldTransform = null;
        this.renderer = null;
        this.matrix = null;
        this.bounds = null;
    }
}
