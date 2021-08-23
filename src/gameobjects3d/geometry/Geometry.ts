import { GetBufferFromVertexSet } from './GetBufferFromVertexSet';
import { IIndexedVertexBuffer } from '../../renderer/webgl1/buffers/IIndexedVertexBuffer';
import { IVertexBuffer } from '../../renderer/webgl1/buffers/IVertexBuffer';
import { VertexSet } from './VertexSet';

export class Geometry
{
    buffer: IVertexBuffer | IIndexedVertexBuffer;

    constructor (data?: VertexSet | IVertexBuffer)
    {
        if (data)
        {
            if (data.hasOwnProperty('vertices'))
            {
                this.buffer = GetBufferFromVertexSet(data as VertexSet);
            }
            else
            {
                this.buffer = data as IVertexBuffer;
            }
        }
    }

    destroy (): void
    {
        this.buffer.destroy();
    }
}
