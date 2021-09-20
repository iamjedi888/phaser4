import { AddBlendMode } from './AddBlendMode';
import { BindBlendMode } from './BindBlendMode';
import { BlendModeStackEntry } from './BlendModeStackEntry';
import { gl } from '../GL';

export function SetBlendMode (enable: boolean, srcRGB: GLenum, dstRGB: GLenum, srcAlpha: GLenum = gl.SRC_ALPHA, dstAlpha: GLenum = gl.ONE_MINUS_SRC_ALPHA): BlendModeStackEntry
{
    const entry = AddBlendMode(enable, srcRGB, dstRGB, srcAlpha, dstAlpha);

    BindBlendMode(entry);
}
