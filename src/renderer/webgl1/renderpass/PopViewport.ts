import { BindViewport } from './BindViewport';
import { ViewportStack } from './ViewportStack';

export function PopViewport (): void
{
    ViewportStack.index--;

    BindViewport();
}
