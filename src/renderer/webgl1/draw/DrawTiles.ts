import { DrawFrame } from './DrawFrame';
import { IRenderPass } from '../renderpass/IRenderPass';
import { ITexture } from '../../../textures/ITexture';

export function DrawTiles <T extends ITexture> (renderPass: IRenderPass, texture: T, tileWidth: number, tileHeight: number, mapData: number[], mapWidth: number, x: number = 0, y: number = 0, alpha: number = 1): void
{
    let tx = 0;
    let ty = 0;
    let i = 0;

    mapData.forEach(tile =>
    {
        if (tile !== -1)
        {
            DrawFrame(
                renderPass,
                texture, tile,
                Math.floor(x + tx), Math.floor(y + ty),
                alpha
            );
        }

        i++;
        tx += tileWidth;

        if (i === mapWidth)
        {
            tx = 0;
            ty += tileHeight;
            i = 0;
        }
    });
}
