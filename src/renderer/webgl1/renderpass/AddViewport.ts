import { Rectangle } from '../../../geom/rectangle/Rectangle';
import { ViewportStack } from './ViewportStack';

export function AddViewport (x: number = 0, y: number = 0, width: number = 0, height: number = 0): Rectangle
{
    const entry = new Rectangle(x, y, width, height);

    ViewportStack.index++;

    //  cursor already at the end of the stack, so we need to grow it
    if (ViewportStack.index === ViewportStack.stack.length)
    {
        ViewportStack.stack.push(entry);
    }
    else
    {
        ViewportStack.stack[ViewportStack.index] = entry;
    }

    return entry;
}
