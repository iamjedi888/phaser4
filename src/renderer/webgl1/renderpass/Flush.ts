import { Draw } from './Draw';
import { IRenderPass } from './IRenderPass';

export function Flush (renderPass: IRenderPass, forceCount?: number): boolean
{
    if (forceCount)
    {
        renderPass.count = forceCount;
    }

    const count = renderPass.count;

    if (count === 0)
    {
        return false;
    }

    Draw(renderPass);

    renderPass.flush();

    return true;
}
