import { Frame } from '../../../textures';
import { ICanvasRenderer } from '../ICanvasRenderer';
import { ITransformComponent } from '../../../components/transform/ITransformComponent';

export function DrawTexturedQuad (frame: Frame, alpha: number, transform: ITransformComponent, renderer: ICanvasRenderer): void
{
    if (!frame)
    {
        return;
    }

    const ctx = renderer.ctx;

    const { a, b, c, d, tx, ty } = transform.world;
    const { x, y } = transform.extent;

    ctx.save();

    ctx.setTransform(a, b, c, d, tx, ty);

    ctx.globalAlpha = alpha;

    ctx.drawImage(frame.texture.image as HTMLImageElement, frame.x, frame.y, frame.width, frame.height, x, y, frame.width, frame.height);

    ctx.restore();
}
