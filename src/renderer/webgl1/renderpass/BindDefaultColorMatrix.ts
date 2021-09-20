import { BindColorMatrix } from './BindColorMatrix';
import { ColorMatrixStack } from './ColorMatrixStack';

export function BindDefaultColorMatrix (): void
{
    ColorMatrixStack.index = 0;

    BindColorMatrix(ColorMatrixStack.default);
}
