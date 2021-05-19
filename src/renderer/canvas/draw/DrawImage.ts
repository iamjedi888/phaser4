import { Frame } from '../../../textures';
import { ICanvasRenderer } from '../ICanvasRenderer';
import { Matrix2D } from '../../../math/mat2d';
import { Rectangle } from '../../../geom/rectangle';

export function DrawImage (frame: Frame, alpha: number, worldTransform: Matrix2D, transformExtent: Rectangle, renderer: ICanvasRenderer): void
{
    if (!frame)
    {
        return;
    }

    const ctx = renderer.ctx;

    const { a, b, c, d, tx, ty } = worldTransform;
    const { x, y } = transformExtent;

    ctx.save();

    ctx.setTransform(a, b, c, d, tx, ty);

    ctx.globalAlpha = alpha;

    ctx.drawImage(frame.texture.image as HTMLImageElement, frame.x, frame.y, frame.width, frame.height, x, y, frame.width, frame.height);

    ctx.restore();
}
