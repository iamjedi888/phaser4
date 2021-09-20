import { BlendModeStackEntry } from './BlendModeStackEntry';
import { IRenderPass } from './IRenderPass';

export type IBlendModeStack =
{
    renderPass: IRenderPass;
    stack: BlendModeStackEntry[];
    default: BlendModeStackEntry;
    index: number;
    init: <T extends IRenderPass> (renderPass: T) => void;
};

export const BlendModeStack: IBlendModeStack =
{
    renderPass: null,
    stack: [],
    default: null,
    index: 0,

    init: <T extends IRenderPass> (renderPass: T): void =>
    {
        BlendModeStack.renderPass = renderPass;
    }
};

/*
get current (): BlendModeStackEntry
    {
        return this.stack[this.index];
    }

    add (enable: boolean, sfactor?: number, dfactor?: number): BlendModeStackEntry
    {
        const entry = { enable, sfactor, dfactor };

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

                //  pma blend func
                // gl.blendFunc(entry.sfactor, entry.dfactor);
                gl.blendFuncSeparate(entry.sfactor, entry.dfactor, gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
            }
        }
        else
        {
            gl.disable(gl.BLEND);
        }
    }

    pop (): void
    {
        this.index--;

        this.bind();
    }

    set (enable: boolean, sfactor?: number, dfactor?: number): void
    {
        const entry = this.add(enable, sfactor, dfactor);

        this.bind(entry);
    }

    setDefault (enable: boolean, sfactor?: number, dfactor?: number): void
    {
        const entry = { enable, sfactor, dfactor };

        //  The default entry always goes into index zero
        this.stack[0] = entry;

        this.index = 0;

        this.default = entry;
    }
}
*/
