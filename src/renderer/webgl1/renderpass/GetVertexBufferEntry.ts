import { BufferEntry } from '../draw/BufferEntry';
import { CurrentVertexBuffer } from './CurrentVertexBuffer';
import { Flush } from './Flush';
import { IRenderPass } from './IRenderPass';

const bufferEntry: BufferEntry = {
    buffer: null,
    F32: null,
    offset: 0
};

export function GetVertexBufferEntry (renderPass: IRenderPass, addToCount: number = 0): BufferEntry
{
    const buffer = CurrentVertexBuffer();

    //  If batch cannot take the size of this entry, flush it first
    if (renderPass.count + addToCount >= buffer.batchSize)
    {
        Flush(renderPass);
    }

    bufferEntry.buffer = buffer;
    bufferEntry.F32 = buffer.vertexViewF32;
    bufferEntry.offset = renderPass.count * buffer.entryElementSize;

    renderPass.count += addToCount;

    return bufferEntry;
}
