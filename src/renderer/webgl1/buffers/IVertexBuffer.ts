export interface IVertexBuffer
{
    name: string;
    batchSize: number;
    dataSize: number;
    vertexElementSize: number;
    vertexByteSize: number;
    entryByteSize: number;
    bufferByteSize: number;
    data: ArrayBuffer;
    vertexViewF32: Float32Array;
    vertexViewU32: Uint32Array;
    indexed: boolean;
    isDynamic: boolean;
    count: number;
    offset: number;
    elementsPerEntry: number;
    isBound: boolean;

    indexSize?: number;
    entryElementSize?: number;
    entryIndexSize?: number;
    index?: Uint16Array;
    vertexBuffer: WebGLBuffer;
    indexBuffer?: WebGLBuffer;
    indexLayout?: number[];

    add (count: number): void;
    canContain (count: number): boolean;
    createIndexBuffer? (seededIndex: number[]): void;
    bind (): void;
    create (): void;
    destroy (): void;
    reset (): void;
    resize (batchSize: number): void;
    free (): number;
}
