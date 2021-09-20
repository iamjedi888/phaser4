import { IRenderPass } from './IRenderPass';
import { IVertexBuffer } from '../buffers/IVertexBuffer';

export type IVertexBufferStack =
{
    renderPass: IRenderPass;

    stack: IVertexBuffer[];
    active: IVertexBuffer;
    default: IVertexBuffer;
    index: number;
    init: <T extends IRenderPass> (renderPass: T) => void;
};

export const VertexBufferStack: IVertexBufferStack =
{
    renderPass: null,
    stack: [],
    active: null,
    default: null,
    index: 0,

    init: <T extends IRenderPass> (renderPass: T): void =>
    {
        VertexBufferStack.renderPass = renderPass;
    }
};
