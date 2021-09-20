import { CurrentShader } from './CurrentShader';
import { Flush } from './Flush';
import { IRenderPass } from './IRenderPass';
import { IVertexBuffer } from '../buffers/IVertexBuffer';
import { PopVertexBuffer } from './PopVertexBuffer';
import { SetAttributes } from '../shaders/SetAttributes';
import { SetVertexBuffer } from './SetVertexBuffer';

export function FlushBuffer (renderPass: IRenderPass, buffer: IVertexBuffer): boolean
{
    SetVertexBuffer(buffer);

    //  Needs setting every time the buffer changes
    SetAttributes(CurrentShader().shader, renderPass);

    const result = Flush(renderPass, buffer.count);

    //  TODO - Pop without binding previous buffer
    PopVertexBuffer();

    return result;
}
