import { BindVertexBuffer } from './BindVertexBuffer';
import { VertexBufferStack } from './VertexBufferStack';

export function BindDefaultVertexBuffer (): void
{
    VertexBufferStack.index = 0;

    BindVertexBuffer(VertexBufferStack.default);
}
