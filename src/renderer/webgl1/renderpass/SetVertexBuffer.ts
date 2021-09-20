import { AddVertexBuffer } from './AddVertexBuffer';
import { BindVertexBuffer } from './BindVertexBuffer';
import { IVertexBuffer } from '../buffers/IVertexBuffer';

export function SetVertexBuffer (buffer: IVertexBuffer): void
{
    const entry = AddVertexBuffer(buffer);

    BindVertexBuffer(entry);
}
