import { Color } from '../../../components/color/Color';
import { IRenderPass } from './IRenderPass';

export function SetColor <T extends IRenderPass> (renderPass: T, color: Color): void
{
    if (color.colorMatrixEnabled && color.willColorChildren)
    {
        renderPass.colorMatrix.set(color);
    }
}
