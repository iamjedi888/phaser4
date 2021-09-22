import { IIndexedVertexBuffer } from './IIndexedVertexBuffer';
import { IVertexBufferConfig } from './IVertexBufferConfig';
import { VertexBuffer } from './VertexBuffer';
export declare class IndexedVertexBuffer extends VertexBuffer implements IIndexedVertexBuffer {
    indexSize: number;
    entryIndexSize: number;
    index: Uint16Array;
    indexBuffer: WebGLBuffer;
    indexLayout: number[];
    constructor(config?: IVertexBufferConfig);
    createIndexBuffer(seededIndex: number[]): void;
    bind(): void;
    destroy(): void;
}
//# sourceMappingURL=IndexedVertexBuffer.d.ts.map