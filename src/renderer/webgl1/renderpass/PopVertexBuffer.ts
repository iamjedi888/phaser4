import { BindVertexBuffer } from './BindVertexBuffer';
import { VertexBufferStack } from './VertexBufferStack';

export function PopVertexBuffer (): void
{
    VertexBufferStack.index--;

    BindVertexBuffer();
}
