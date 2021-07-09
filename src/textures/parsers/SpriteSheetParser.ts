import { IFrameConfig } from '../IFrameConfig';
import { Texture } from '../Texture';

export function SpriteSheetParser (texture: Texture, x: number, y: number, width: number, height: number, frameConfig: IFrameConfig): void
{
    const {
        frameWidth = null,
        endFrame = -1,
        margin = 0,
        spacingX = 0,
        spacingY = 0
    } = frameConfig;

    let {
        frameHeight = null,
        startFrame = 0
    } = frameConfig;

    if (!frameHeight)
    {
        frameHeight = frameWidth;
    }

    //  If missing we can't proceed
    if (frameWidth === null)
    {
        throw new Error('SpriteSheetParser: Invalid frameWidth');
    }

    const row: number = Math.floor((width - margin + spacingX) / (frameWidth + spacingX));
    const column: number = Math.floor((height - margin + spacingY) / (frameHeight + spacingY));
    let total: number = row * column;

    if (total === 0)
    {
        console.warn('SpriteSheetParser: Frame config will result in zero frames');
    }

    if (startFrame > total || startFrame < -total)
    {
        startFrame = 0;
    }

    if (startFrame < 0)
    {
        //  Allow negative skipframes.
        startFrame = total + startFrame;
    }

    if (endFrame !== -1)
    {
        total = startFrame + (endFrame + 1);
    }

    let fx: number = margin;
    let fy: number = margin;
    let ax: number = 0;
    let ay: number = 0;

    for (let i: number = 0; i < total; i++)
    {
        ax = 0;
        ay = 0;

        const w: number = fx + frameWidth;
        const h: number = fy + frameHeight;

        if (w > width)
        {
            ax = w - width;
        }

        if (h > height)
        {
            ay = h - height;
        }

        texture.addFrame(i, x + fx, y + fy, frameWidth - ax, frameHeight - ay);

        fx += frameWidth + spacingX;

        if (fx + frameWidth > width)
        {
            fx = margin;
            fy += frameHeight + spacingY;
        }
    }
}
