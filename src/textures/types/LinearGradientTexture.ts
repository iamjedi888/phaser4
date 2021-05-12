import { CreateCanvas } from '../CreateCanvas';
import { Texture } from '../Texture';

export type ColorStop = {
    offset: number,
    color: string
};

export type LinearGradientTextureType = {
    width?: number,
    height?: number,
    x0?: number,
    y0?: number,
    x1?: number,
    y1?: number,
    horizontal?: boolean,
    colorStops?: ColorStop[]
};

export function LinearGradientTexture (config: LinearGradientTextureType): Texture
{
    const {
        width = 256,
        height = 256,
        horizontal = false,
        x0 = 0,
        y0 = 0,
        x1 = (horizontal) ? width : 0,
        y1 = (horizontal) ? 0 : height,
        colorStops = [ { offset: 0, color: 'red' } ]
    } = config;

    const ctx = CreateCanvas(width, height);

    const gradient = ctx.createLinearGradient(x0, y0, x1, y1);

    for (const colorStop of colorStops.values())
    {
        gradient.addColorStop(colorStop.offset, colorStop.color);
    }

    ctx.fillStyle = gradient;

    ctx.fillRect(0, 0, width, height);

    return new Texture(ctx.canvas);
}
