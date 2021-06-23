import { IRenderPass } from './IRenderPass';
import { Rectangle } from '../../../geom/rectangle/Rectangle';
import { gl } from '../GL';

export class ViewportStack
{
    renderPass: IRenderPass;

    stack: Rectangle[];
    // current: Rectangle;
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

        this.bind();
    }

    bind (viewport?: Rectangle): void
    {
        if (!viewport)
        {
            viewport = this.current;

            if (!viewport)
            {
                return;
            }
        }

        const glv = gl.getParameter(gl.VIEWPORT);

        if (glv[0] !== viewport.x || glv[1] !== viewport.y || glv[2] !== viewport.width || glv[3] !== viewport.height)
        {
            gl.viewport(viewport.x, viewport.y, viewport.width, viewport.height);
        }
    }

    pop (): void
    {
        // const stack = this.stack;

        // //  > 1 because index 0 contains the default, which we don't want to remove
        // if (stack.length > 1)
        // {
        //     stack.pop();
        // }

        // this.current = stack[ stack.length - 1 ];

        this.index--;

        this.bind();
    }

    set (x: number = 0, y: number = 0, width: number = 0, height: number = 0): void
    {
        const entry = this.add(x, y, width, height);

        this.bind(entry);

        // this.current = entry;
    }

    setDefault (x: number = 0, y: number = 0, width: number = 0, height: number = 0): void
    {
        const entry = new Rectangle(x, y, width, height);

        //  The default entry always goes into index zero
        this.stack[0] = entry;

        this.index = 0;

        // this.current = entry;
        this.default = entry;
    }
}
