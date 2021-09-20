import { Color } from '../../../components/color/Color';
import { IRenderPass } from './IRenderPass';
import { PopColorMatrix } from './PopColorMatrix';

export function PopColor <T extends IRenderPass> (renderPass: T, color: Color): void
{
    if (color.colorMatrixEnabled && color.willColorChildren)
    {
        PopColorMatrix();
    }
}
