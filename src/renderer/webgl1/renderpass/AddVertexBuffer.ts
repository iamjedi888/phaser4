import { IVertexBuffer } from '../buffers/IVertexBuffer';
import { VertexBufferStack } from './VertexBufferStack';

export function AddVertexBuffer (buffer: IVertexBuffer): IVertexBuffer
{
    VertexBufferStack.index++;

    //  cursor already at the end of the stack, so we need to grow it
    if (VertexBufferStack.index === VertexBufferStack.stack.length)
    {
        VertexBufferStack.stack.push(buffer);
    }
    else
    {
        VertexBufferStack.stack[VertexBufferStack.index] = buffer;
    }

    return buffer;
}
