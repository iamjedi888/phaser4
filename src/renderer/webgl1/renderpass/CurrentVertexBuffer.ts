import { IVertexBuffer } from '../buffers/IVertexBuffer';
import { VertexBufferStack } from './VertexBufferStack';

export function CurrentVertexBuffer (): IVertexBuffer
{
    return VertexBufferStack.stack[VertexBufferStack.index];
}
