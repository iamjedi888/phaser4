import { IRenderPass } from '../renderpass/IRenderPass';
import { IShader } from './IShader';
import { gl } from '../GL';

export function SetAttributes <T extends IShader> (shader: T, renderPass: IRenderPass): void
{
    if (shader.program)
    {
        //  stride = vertexByteSize
        const stride = renderPass.vertexbuffer.current.vertexByteSize;

        shader.attributes.forEach(attrib =>
        {
            gl.vertexAttribPointer(attrib.index, attrib.size, attrib.type, attrib.normalized, stride, attrib.offset);
        });
    }
}
