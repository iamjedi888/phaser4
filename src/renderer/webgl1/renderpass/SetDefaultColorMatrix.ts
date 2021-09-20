import { ColorMatrixStack } from './ColorMatrixStack';

export function SetDefaultColorMatrix (colorMatrix: Float32Array, colorOffset: Float32Array): void
{
    const entry = { colorMatrix, colorOffset };

    //  The default entry always goes into index zero
    ColorMatrixStack.stack[0] = entry;

    ColorMatrixStack.index = 0;

    ColorMatrixStack.default = entry;
}
