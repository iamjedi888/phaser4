import { IRenderPass } from './IRenderPass';
import { Rectangle } from '../../../geom/rectangle/Rectangle';
import { gl } from '../GL';

export class ViewportStack
{
    renderPass: IRenderPass;

    stack: Rectangle[];
    current: Rectangle;
    default: Rectangle;

    constructor (renderPass: IRenderPass)
    {
        this.renderPass = renderPass;
        this.stack = [];
    }

    add (x: number = 0, y: number = 0, width: number = 0, height: number = 0): Rectangle
    {
        const viewport = new Rectangle(x, y, width, height);

        this.stack.push(viewport);

        return viewport;
    }

    bindDefault (): void
    {
        this.bind(this.default);
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
        const stack = this.stack;

        //  > 1 because index 0 contains the default, which we don't want to remove
        if (stack.length > 1)
        {
            stack.pop();
        }

        this.current = stack[ stack.length - 1 ];

        this.bind();
    }

    set (x: number = 0, y: number = 0, width: number = 0, height: number = 0): void
    {
        const entry = this.add(x, y, width, height);

        this.bind(entry);

        this.current = entry;
    }

    setDefault (x: number = 0, y: number = 0, width: number = 0, height: number = 0): void
    {
        const entry = new Rectangle(x, y, width, height);

        //  The default entry always goes into index zero
        this.stack[0] = entry;

        this.current = entry;
        this.default = entry;
    }
}
