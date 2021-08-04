import { Flush } from './Flush';
import { IRenderPass } from './IRenderPass';

export function End (renderPass: IRenderPass): void
{
    Flush(renderPass);
}
