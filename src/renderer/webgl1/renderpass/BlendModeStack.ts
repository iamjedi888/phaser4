import { IRenderPass } from './IRenderPass';
import { gl } from '../GL';

export type BlendModeStackEntry = {
    enable: boolean;
    sfactor?: number;
    dfactor?: number;
};

export class BlendModeStack
{
    renderPass: IRenderPass;

    stack: BlendModeStackEntry[];
    current: BlendModeStackEntry;
    default: BlendModeStackEntry;

    constructor (renderPass: IRenderPass)
    {
        this.renderPass = renderPass;
        this.stack = [];
    }

    add (enable: boolean, sfactor?: number, dfactor?: number): BlendModeStackEntry
    {
        const entry = { enable, sfactor, dfactor };

        this.stack.push(entry);

        return entry;
    }

    bindDefault (): void
    {
        this.bind(this.default);
    }

    bind (entry?: BlendModeStackEntry): void
    {
        if (!entry)
        {
            entry = this.current;
        }

        if (entry.enable)
        {
            if (!gl.isEnabled(gl.BLEND) || (this.current.sfactor !== entry.sfactor || this.current.dfactor !== entry.dfactor))
            {
                gl.enable(gl.BLEND);
                gl.blendFunc(entry.sfactor, entry.dfactor);
            }
        }
        else
        {
            gl.disable(gl.BLEND);
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

    set (enable: boolean, sfactor?: number, dfactor?: number): void
    {
        const entry = this.add(enable, sfactor, dfactor);

        this.bind(entry);

        this.current = entry;
    }

    setDefault (enable: boolean, sfactor?: number, dfactor?: number): void
    {
        const entry = { enable, sfactor, dfactor };

        //  The default entry always goes into index zero
        this.stack[0] = entry;

        this.current = entry;
        this.default = entry;
    }
}
