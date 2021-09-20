import { IVertexBuffer } from '../buffers/IVertexBuffer';
import { VertexBufferStack } from './VertexBufferStack';

export function SetDefaultVertexBuffer (buffer: IVertexBuffer): void
{
    VertexBufferStack.stack[0] = buffer;

    VertexBufferStack.index = 0;

    VertexBufferStack.default = buffer;
}
