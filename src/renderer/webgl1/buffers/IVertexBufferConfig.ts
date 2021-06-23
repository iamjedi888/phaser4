export type IVertexBufferConfig = {
    name?: string;
    batchSize?: number;
    dataSize?: number;
    entryIndexSize?: number;
    indexLayout?: number[];
    indexSize?: number;
    isDynamic?: boolean;
    elementsPerEntry?: number;
    vertexElementSize?: number;
};
