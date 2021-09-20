import { BindViewport } from './BindViewport';
import { ViewportStack } from './ViewportStack';

export function BindDefaultViewport (): void
{
    ViewportStack.index = 0;

    BindViewport(ViewportStack.default);
}
