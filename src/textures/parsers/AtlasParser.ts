/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { Frame } from '../Frame';
import { Texture } from '../Texture';

export function AtlasParser (texture: Texture, data: any): void
{
    let frames: any[];

    if (Array.isArray(data.textures))
    {
        //  TP3 Format
        frames = data.textures[0].frames;
    }
    else if (Array.isArray(data.frames))
    {
        //  TP2 Format Array
        frames = data.frames;
    }
    else if (data.hasOwnProperty('frames'))
    {
        //  TP2 Format Hash
        frames = [];

        for (const [ filename, frame ] of Object.entries(data.frames))
        {
            //  Inject the filename into the frame object
            frame['filename'] = filename;

            frames.push(frame);
        }
    }
    else
    {
        console.warn('Invalid Texture Atlas JSON');
    }

    if (frames)
    {
        let newFrame: Frame;

        for (let i = 0; i < frames.length; i++)
        {
            const src = frames[i];

            //  The frame values are the exact coordinates to cut the frame out of the atlas from
            newFrame = texture.addFrame(src.filename, src.frame.x, src.frame.y, src.frame.w, src.frame.h);

            //  These are the original (non-trimmed) sprite values
            if (src.trimmed)
            {
                newFrame.setTrim(
                    src.sourceSize.w,
                    src.sourceSize.h,
                    src.spriteSourceSize.x,
                    src.spriteSourceSize.y,
                    src.spriteSourceSize.w,
                    src.spriteSourceSize.h
                );
            }
            else
            {
                newFrame.setSourceSize(src.sourceSize.w, src.sourceSize.h);
            }

            if (src.rotated)
            {
                // newFrame.rotated = true;
                // newFrame.updateUVsInverted();
            }

            if (src.anchor)
            {
                newFrame.setPivot(src.anchor.x, src.anchor.y);
            }
        }
    }
}
