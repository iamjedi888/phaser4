import { IRenderPass } from './IRenderPass';
import { Rectangle } from '../../../geom/rectangle/Rectangle';
import { RectangleEquals } from '../../../geom/rectangle/RectangleEquals';
import { gl } from '../GL';

export class ViewportStack
{
    renderPass: IRenderPass;

    stack: Rectangle[];
    active: Rectangle;
    default: Rectangle;
    index: number;

    constructor (renderPass: IRenderPass)
    {
        this.renderPass = renderPass;
        this.stack = [];
    }

    get current (): Rectangle
    {
        return this.stack[this.index];
    }

    add (x: number = 0, y: number = 0, width: number = 0, height: number = 0): Rectangle
    {
        const entry = new Rectangle(x, y, width, height);

        this.index++;

        //  cursor already at the end of the stack, so we need to grow it
        if (this.index === this.stack.length)
        {
            this.stack.push(entry);
        }
        else
        {
            this.stack[this.index] = entry;
        }

        return entry;
    }

    bindDefault (): void
    {
        this.index = 0;

        this.bind(this.default);
    }

    bind (viewport?: Rectangle): void
    {
        if (!viewport)
        {
            viewport = this.current;
        }

        if (!this.active || !RectangleEquals(this.active, viewport))
        {
            gl.viewport(viewport.x, viewport.y, viewport.width, viewport.height);

            this.active = viewport;
        }
    }

    pop (): void
    {
        this.index--;

        this.bind();
    }

    set (x: number = 0, y: number = 0, width: number = 0, height: number = 0): void
    {
        const entry = this.add(x, y, width, height);

        this.bind(entry);
    }

    setDefault (x: number = 0, y: number = 0, width: number = 0, height: number = 0): void
    {
        const entry = new Rectangle(x, y, width, height);

        //  The default entry always goes into index zero
        this.stack[0] = entry;

        this.index = 0;

        this.default = entry;
    }
}
