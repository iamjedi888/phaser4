import { IIndexedVertexBuffer } from '../../renderer/webgl1/buffers/IIndexedVertexBuffer';
import { IVertexBuffer } from '../../renderer/webgl1/buffers/IVertexBuffer';
import { VertexSet } from './VertexSet';
export declare class Geometry {
    buffer: IVertexBuffer | IIndexedVertexBuffer;
    constructor(data?: VertexSet | IVertexBuffer);
    destroy(): void;
}
//# sourceMappingURL=Geometry.d.ts.map