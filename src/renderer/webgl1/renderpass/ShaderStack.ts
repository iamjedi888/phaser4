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
    current: ShaderStackEntry;
    default: ShaderStackEntry;

    constructor (renderPass: IRenderPass)
    {
        this.renderPass = renderPass;
        this.stack = [];
    }

    add (shader: IShader, textureID?: number): ShaderStackEntry
    {
        const stackEntry = { shader, textureID };

        this.stack.push(stackEntry);

        return stackEntry;
    }

    bind (entry?: ShaderStackEntry): void
    {
        let prevShader;

        if (!entry)
        {
            entry = this.current;
        }
        else
        {
            prevShader = this.current.shader;
        }

        if (!entry.shader.isActive)
        {
            const success = entry.shader.bind(this.renderPass, entry.textureID);

            if (success)
            {
                entry.shader.setAttributes(this.renderPass);

                if (prevShader && prevShader !== entry.shader)
                {
                    prevShader.isActive = false;
                }
            }
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

    set (shader: IShader, textureID?: number): void
    {
        const entry = this.add(shader, textureID);

        this.bind(entry);

        this.current = entry;
    }

    setDefault (shader: IShader, textureID?: number): void
    {
        const entry = { shader, textureID };

        //  The default entry always goes into index zero
        this.stack[0] = entry;

        this.current = entry;
        this.default = entry;
    }
}
