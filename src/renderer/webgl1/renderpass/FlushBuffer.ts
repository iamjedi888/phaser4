import { Flush } from './Flush';
import { IRenderPass } from './IRenderPass';
import { IVertexBuffer } from '../buffers/IVertexBuffer';

export function FlushBuffer (renderPass: IRenderPass, buffer: IVertexBuffer): boolean
{
    renderPass.vertexbuffer.set(buffer);

    //  Needs setting every time the buffer changes
    renderPass.shader.current.shader.setAttributes(renderPass);

    const result = Flush(renderPass, buffer.count);

    //  TODO - Pop without binding previous buffer
    renderPass.vertexbuffer.pop();

    return result;
}
