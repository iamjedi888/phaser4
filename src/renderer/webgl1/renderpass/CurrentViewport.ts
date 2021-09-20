import { Rectangle } from '../../../geom/rectangle/Rectangle';
import { ViewportStack } from './ViewportStack';

export function CurrentViewport (): Rectangle
{
    return ViewportStack.stack[ViewportStack.index];
}
