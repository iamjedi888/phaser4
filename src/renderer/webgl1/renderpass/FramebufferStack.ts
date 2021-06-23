import { IRenderPass } from './IRenderPass';
import { Rectangle } from '../../../geom/rectangle/Rectangle';
import { gl } from '../GL';

export type FramebufferStackEntry = {
    framebuffer: WebGLFramebuffer;
    viewport?: Rectangle;
};

export class FramebufferStack
{
    renderPass: IRenderPass;

    stack: FramebufferStackEntry[];
    // current: FramebufferStackEntry;
    default: FramebufferStackEntry;
    index: number;

    constructor (renderPass: IRenderPass)
    {
        this.renderPass = renderPass;
        this.stack = [];
    }

    get current (): FramebufferStackEntry
    {
        return this.stack[this.index];
    }

    add (framebuffer: WebGLFramebuffer, viewport?: Rectangle): FramebufferStackEntry
    {
        const entry = { framebuffer, viewport };

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

        this.bind(false);
    }

    bind (clear: boolean = true, entry?: FramebufferStackEntry): void
    {
        if (!entry)
        {
            entry = this.current;
        }

        const { framebuffer, viewport } = entry;

        if (this.current.framebuffer !== framebuffer)
        {
            gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
        }

        if (clear)
        {
            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        }

        if (viewport)
        {
            this.renderPass.viewport.set(viewport.x, viewport.y, viewport.width, viewport.height);
        }
    }

    pop (): void
    {
        // const stack = this.stack;

        // //  > 1 because index 0 contains the default, which we don't want to remove
        // if (stack.length > 1)
        // {
        //     if (this.current.viewport)
        //     {
        //         this.renderPass.viewport.pop();
        //     }

        //     stack.pop();
        // }

        // this.current = stack[ stack.length - 1 ];

        if (this.index > 0 && this.current.viewport)
        {
            this.renderPass.viewport.pop();
        }

        this.index--;

        this.bind(false);
    }

    set (framebuffer: WebGLFramebuffer, clear: boolean = true, viewport?: Rectangle): void
    {
        const entry = this.add(framebuffer, viewport);

        this.bind(clear, entry);

        // this.current = entry;
    }

    setDefault (framebuffer: WebGLFramebuffer = null, viewport?: Rectangle): void
    {
        const entry = { framebuffer, viewport };

        //  The default entry always goes into index zero
        this.stack[0] = entry;

        this.index = 0;

        // this.current = entry;
        this.default = entry;
    }
}
