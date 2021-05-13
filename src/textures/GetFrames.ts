import { Frame } from './Frame';
import { GetTexture } from './GetTexture';
import { ITexture } from './ITexture';

export function GetFrames (texture: string | ITexture, frames?: string[] | number[]): Frame[]
{
    if (typeof(texture) === 'string')
    {
        texture = GetTexture(texture);
    }

    const output: Frame[] = [];

    for (const frame of texture.frames.values())
    {
        //  Don't include the base frame if this is a multi-frame Texture
        if (frame.key === '__BASE' && texture.frames.size > 1)
        {
            continue;
        }

        if (!frames || frames.indexOf(frame.key as never) !== -1)
        {
            output.push(frame);
        }
    }

    return output;
}
