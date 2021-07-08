import { IVertexBuffer } from '../buffers/IVertexBuffer';

export type BufferEntry = {
    buffer: IVertexBuffer;
    F32: Float32Array;
    offset: number;
};
