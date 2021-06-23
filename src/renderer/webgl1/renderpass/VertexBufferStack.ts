import { IRenderPass } from './IRenderPass';
import { IVertexBuffer } from '../buffers/IVertexBuffer';
import { gl } from '../GL';

export class VertexBufferStack
{
    renderPass: IRenderPass;

    stack: IVertexBuffer[];
    active: IVertexBuffer;
    default: IVertexBuffer;
    index: number;

    constructor (renderPass: IRenderPass)
    {
        this.renderPass = renderPass;
        this.stack = [];
    }

    get current (): IVertexBuffer
    {
        return this.stack[this.index];
    }

    add (buffer: IVertexBuffer): IVertexBuffer
    {
        this.index++;

        //  cursor already at the end of the stack, so we need to grow it
        if (this.index === this.stack.length)
        {
            this.stack.push(buffer);
        }
        else
        {
            this.stack[this.index] = buffer;
        }

        return buffer;
    }

    bindDefault (): void
    {
        this.index = 0;

        this.bind(this.default);
    }

    bind (buffer?: IVertexBuffer): void
    {
        if (!buffer)
        {
            buffer = this.current;
        }

        if (!buffer.isBound)
        {
            const indexBuffer = (buffer.indexed) ? buffer.indexBuffer : null;

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

            gl.bindBuffer(gl.ARRAY_BUFFER, buffer.vertexBuffer);

            buffer.isBound = true;

            if (this.active && this.active !== buffer)
            {
                this.active.isBound = false;
            }

            this.active = buffer;
        }
    }

    pop (): void
    {
        this.index--;

        this.bind();
    }

    set (buffer: IVertexBuffer): void
    {
        const entry = this.add(buffer);

        this.bind(entry);
    }

    setDefault (buffer: IVertexBuffer): void
    {
        //  The default entry always goes into index zero
        this.stack[0] = buffer;

        this.index = 0;

        this.default = buffer;
    }
}
