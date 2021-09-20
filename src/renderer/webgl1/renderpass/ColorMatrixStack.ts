import { Color } from '../../../components/color/Color';
import { CompareColorMatrix } from '../../../components/color/CompareColorMatrix';
import { CurrentShader } from './CurrentShader';
import { Flush } from './Flush';
import { IRenderPass } from './IRenderPass';
import { SetUniform } from '../shaders/SetUniform';

export type ColorMatrixStackEntry = {
    colorMatrix: Float32Array;
    colorOffset: Float32Array;
};

export class ColorMatrixStack
{
    renderPass: IRenderPass;

    stack: ColorMatrixStackEntry[];
    default: ColorMatrixStackEntry;
    index: number;

    constructor (renderPass: IRenderPass)
    {
        this.renderPass = renderPass;
        this.stack = [];
    }

    get current (): ColorMatrixStackEntry
    {
        return this.stack[this.index];
    }

    add (colorMatrix: Float32Array, colorOffset: Float32Array): ColorMatrixStackEntry
    {
        const entry = { colorMatrix, colorOffset };

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

    bind (entry?: ColorMatrixStackEntry): void
    {
        if (!entry)
        {
            entry = this.current;
        }

        const shader = CurrentShader().shader;

        Flush(this.renderPass);

        SetUniform(shader, 'uColorMatrix', entry.colorMatrix);
        SetUniform(shader, 'uColorOffset', entry.colorOffset);
    }

    pop (): void
    {
        this.index--;

        this.bind();
    }

    set (color: Color): void
    {
        const current = this.current;

        const entry = this.add(color.colorMatrix, color.colorOffset);

        if (!CompareColorMatrix(entry.colorMatrix, entry.colorOffset, current.colorMatrix, current.colorOffset))
        {
            this.bind(entry);
        }
    }

    setDefault (colorMatrix: Float32Array, colorOffset: Float32Array): void
    {
        const entry = { colorMatrix, colorOffset };

        //  The default entry always goes into index zero
        this.stack[0] = entry;

        this.index = 0;

        this.default = entry;
    }
}
