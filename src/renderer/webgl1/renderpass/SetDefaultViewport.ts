import { Rectangle } from '../../../geom/rectangle/Rectangle';
import { ViewportStack } from './ViewportStack';

export function SetDefaultViewport (x: number = 0, y: number = 0, width: number = 0, height: number = 0): void
{
    const entry = new Rectangle(x, y, width, height);

    //  The default entry always goes into index zero
    ViewportStack.stack[0] = entry;

    ViewportStack.index = 0;

    ViewportStack.default = entry;
}
