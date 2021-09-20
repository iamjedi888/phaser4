import { BlendModeStack } from './BlendModeStack';
import { gl } from '../GL';

export function SetDefaultBlendMode (enable: boolean, srcRGB: GLenum, dstRGB: GLenum, srcAlpha: GLenum = gl.SRC_ALPHA, dstAlpha: GLenum = gl.ONE_MINUS_SRC_ALPHA): void
{
    const entry = { enable, srcRGB, dstRGB, srcAlpha, dstAlpha };

    //  The default entry always goes in index zero
    BlendModeStack.stack[0] = entry;

    BlendModeStack.index = 0;

    BlendModeStack.default = entry;
}
