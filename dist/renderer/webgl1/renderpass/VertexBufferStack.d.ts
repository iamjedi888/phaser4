import { IRenderPass } from './IRenderPass';
import { IVertexBuffer } from '../buffers/IVertexBuffer';
export declare type IVertexBufferStack = {
    renderPass: IRenderPass;
    stack: IVertexBuffer[];
    active: IVertexBuffer;
    default: IVertexBuffer;
    index: number;
    init: <T extends IRenderPass>(renderPass: T) => void;
};
export declare const VertexBufferStack: IVertexBufferStack;
//# sourceMappingURL=VertexBufferStack.d.ts.map