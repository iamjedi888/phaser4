import { ColorMatrixStack } from './ColorMatrixStack';
import { ColorMatrixStackEntry } from './ColorMatrixStackEntry';

export function CurrentColorMatrix (): ColorMatrixStackEntry
{
    return ColorMatrixStack.stack[ColorMatrixStack.index];
}
