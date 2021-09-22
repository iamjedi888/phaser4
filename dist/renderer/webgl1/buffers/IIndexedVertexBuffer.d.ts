import { IVertexBuffer } from './IVertexBuffer';
export interface IIndexedVertexBuffer extends IVertexBuffer {
    indexSize?: number;
    entryElementSize?: number;
    entryIndexSize?: number;
    index?: Uint16Array;
    vertexBuffer: WebGLBuffer;
    indexBuffer?: WebGLBuffer;
    indexLayout?: number[];
    createIndexBuffer(seededIndex: number[]): void;
}
//# sourceMappingURL=IIndexedVertexBuffer.d.ts.map