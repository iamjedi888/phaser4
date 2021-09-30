import { GetSpritesWithTexture } from './index';
import { IFrame } from './IFrame';
import { SetQuadUVs } from '../components/vertices/SetQuadUVs';

export function SetFrameUVs <T extends IFrame> (frame: T, u0: number, v0: number, u1: number, v1: number): T
{
    frame.u0 = u0;
    frame.v0 = v0;
    frame.u1 = u1;
    frame.v1 = v1;

    const sprites = GetSpritesWithTexture(frame);

    sprites.forEach(sprite =>
    {
        SetQuadUVs(sprite.id, u0, v0, u1, v1);
    });

    return frame;
}
