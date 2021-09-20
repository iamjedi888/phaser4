import { CurrentShader } from './CurrentShader';
import { CurrentVertexBuffer } from './CurrentVertexBuffer';
import { IRenderPass } from './IRenderPass';
import { PopFramebuffer } from './PopFramebuffer';
import { SetFramebuffer } from './index';
import { gl } from '../GL';

export function Draw (renderPass: IRenderPass): void
{
    const count = renderPass.count;

    if (count === 0)
    {
        return;
    }

    const currentBuffer = CurrentVertexBuffer();
    const currentShader = CurrentShader();

    const renderToFramebuffer = currentShader.shader.renderToFramebuffer;

    if (renderToFramebuffer)
    {
        SetFramebuffer(currentShader.shader.framebuffer, true, currentShader.shader.viewport);
    }

    if (count === currentBuffer.batchSize)
    {
        const type = (currentBuffer.isDynamic) ? gl.DYNAMIC_DRAW : gl.STATIC_DRAW;

        gl.bufferData(gl.ARRAY_BUFFER, currentBuffer.data, type);
    }
    else
    {
        const subsize = count * currentBuffer.entryElementSize;

        const view = currentBuffer.vertexViewF32.subarray(0, subsize);

        gl.bufferSubData(gl.ARRAY_BUFFER, 0, view);
    }

    if (currentBuffer.indexed)
    {
        gl.drawElements(gl.TRIANGLES, count * currentBuffer.entryIndexSize, gl.UNSIGNED_SHORT, 0);
    }
    else
    {
        gl.drawArrays(gl.TRIANGLES, 0, count * currentBuffer.elementsPerEntry);
    }

    if (renderToFramebuffer)
    {
        PopFramebuffer();
    }
}
