import { Color } from '../../../components/color/Color';
import { IRenderPass } from './IRenderPass';
import { SetColorMatrix } from './SetColorMatrix';

export function SetColor <T extends IRenderPass> (renderPass: T, color: Color): void
{
    if (color.colorMatrixEnabled && color.willColorChildren)
    {
        SetColorMatrix(color);
    }
}
