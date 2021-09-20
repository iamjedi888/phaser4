import { ColorMatrixStack } from './ColorMatrixStack';
import { ColorMatrixStackEntry } from './ColorMatrixStackEntry';

export function AddColorMatrix (colorMatrix: Float32Array, colorOffset: Float32Array): ColorMatrixStackEntry
{
    const entry = { colorMatrix, colorOffset };

    ColorMatrixStack.index++;

    //  cursor already at the end of the stack, so we need to grow it
    if (ColorMatrixStack.index === ColorMatrixStack.stack.length)
    {
        ColorMatrixStack.stack.push(entry);
    }
    else
    {
        ColorMatrixStack.stack[ColorMatrixStack.index] = entry;
    }

    return entry;
}
