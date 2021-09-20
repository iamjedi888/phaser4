import { BlendModeStack } from './BlendModeStack';
import { BlendModeStackEntry } from './BlendModeStackEntry';
import { gl } from '../GL';

export function AddBlendMode (enable: boolean, srcRGB: GLenum, dstRGB: GLenum, srcAlpha: GLenum = gl.SRC_ALPHA, dstAlpha: GLenum = gl.ONE_MINUS_SRC_ALPHA): BlendModeStackEntry
{
    const entry = { enable, srcRGB, dstRGB, srcAlpha, dstAlpha };

    BlendModeStack.index++;

    //  cursor already at the end of the stack, so we need to grow it
    if (BlendModeStack.index === BlendModeStack.stack.length)
    {
        BlendModeStack.stack.push(entry);
    }
    else
    {
        BlendModeStack.stack[BlendModeStack.index] = entry;
    }

    return entry;
}
