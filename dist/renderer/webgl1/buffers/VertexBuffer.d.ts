import { IVertexBuffer } from './IVertexBuffer';
import { IVertexBufferConfig } from './IVertexBufferConfig';
export declare class VertexBuffer implements IVertexBuffer {
    name: string;
    batchSize: number;
    dataSize: number;
    vertexElementSize: number;
    vertexByteSize: number;
    entryByteSize: number;
    bufferByteSize: number;
    data: ArrayBuffer;
    vertexViewF32: Float32Array;
    vertexBuffer: WebGLBuffer;
    entryElementSize: number;
    indexed: boolean;
    isDynamic: boolean;
    count: number;
    offset: number;
    elementsPerEntry: number;
    isBound: boolean;
    constructor(config?: IVertexBufferConfig);
    resize(batchSize: number): void;
    create(): void;
    add(count: number): void;
    reset(): void;
    canContain(count: number): boolean;
    free(): number;
    bind(): void;
    destroy(): void;
}
//# sourceMappingURL=VertexBuffer.d.ts.map