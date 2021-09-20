import { BindColorMatrix } from './BindColorMatrix';
import { ColorMatrixStack } from './ColorMatrixStack';

export function PopColorMatrix (): void
{
    ColorMatrixStack.index--;

    BindColorMatrix();
}
