import { CurrentViewport } from './CurrentViewport';
import { Rectangle } from '../../../geom/rectangle/Rectangle';
import { RectangleEquals } from '../../../geom/rectangle/RectangleEquals';
import { ViewportStack } from './ViewportStack';
import { gl } from '../GL';

export function BindViewport (viewport?: Rectangle): void
{
    if (!viewport)
    {
        viewport = CurrentViewport();
    }

    if (!ViewportStack.active || !RectangleEquals(ViewportStack.active, viewport))
    {
        gl.viewport(viewport.x, viewport.y, viewport.width, viewport.height);

        ViewportStack.active = viewport;
    }
}
