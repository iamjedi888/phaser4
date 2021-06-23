import { IRenderPass } from './IRenderPass';
import { IShader } from '../shaders/IShader';

export type ShaderStackEntry = {
    shader: IShader;
    textureID?: number;
};

export class ShaderStack
{
    renderPass: IRenderPass;

    stack: ShaderStackEntry[];
    active: IShader;
    default: ShaderStackEntry;
    index: number;

    constructor (renderPass: IRenderPass)
    {
        this.renderPass = renderPass;
        this.stack = [];
    }

    get current (): ShaderStackEntry
    {
        return this.stack[this.index];
    }

    add (shader: IShader, textureID?: number): ShaderStackEntry
    {
        const entry = { shader, textureID };

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

    bind (entry?: ShaderStackEntry): void
    {
        if (!entry)
        {
            entry = this.current;
        }

        if (!entry.shader.isActive)
        {
            const success = entry.shader.bind(this.renderPass, entry.textureID);

            if (success)
            {
                entry.shader.setAttributes(this.renderPass);

                if (this.active && this.active !== entry.shader)
                {
                    this.active.isActive = false;
                }

                this.active = entry.shader;
            }
        }
    }

    pop (): void
    {
        this.index--;

        this.bind();
    }

    set (shader: IShader, textureID?: number): void
    {
        const entry = this.add(shader, textureID);

        this.bind(entry);
    }

    setDefault (shader: IShader, textureID?: number): void
    {
        const entry = { shader, textureID };

        //  The default entry always goes into index zero
        this.stack[0] = entry;

        this.index = 0;

        this.default = entry;
    }
}
