import { BufferEntry } from '../draw/BufferEntry';
import { Flush } from './Flush';
import { IRenderPass } from './IRenderPass';

export function GetVertexBufferEntry (renderPass: IRenderPass, addToCount: number = 0): BufferEntry
{
    const buffer = renderPass.vertexbuffer.current;

    //  If batch cannot take the size of this entry, flush it first
    if (renderPass.count + addToCount >= buffer.batchSize)
    {
        Flush(renderPass);
    }

    const offset = renderPass.count * buffer.entryElementSize;

    renderPass.count += addToCount;

    return {
        buffer,
        F32: buffer.vertexViewF32,
        U32: buffer.vertexViewU32,
        offset
    };
}
