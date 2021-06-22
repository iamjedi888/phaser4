import { BindTexture, Flush, UnbindTexture } from '../renderpass';

import { BatchSingleQuad } from './BatchSingleQuad';
import { IRenderPass } from '../renderpass/IRenderPass';
import { IShader } from '../shaders/IShader';
import { Texture } from '../../../textures';

export function DrawTexturedQuad (renderPass: IRenderPass, texture: Texture, shader?: IShader): void
{
    if (!shader)
    {
        shader = renderPass.quadShader;
    }

    const { u0, v0, u1, v1 } = texture.firstFrame;

    BindTexture(texture, 0);

    // SetVertexBuffer(renderPass, renderPass.quadBuffer);
    renderPass.vertexbuffer.set(renderPass.quadBuffer);

    // SetShader(renderPass, shader, 0);
    renderPass.shader.set(shader, 0);

    BatchSingleQuad(renderPass, 0, 0, texture.width, texture.height, u0, v0, u1, v1, 0);

    Flush(renderPass);

    //  Should always pop the vbo first, so when the shader is popped the attributes are set correctly
    // PopVertexBuffer(renderPass);
    renderPass.vertexbuffer.pop();

    // PopShader(renderPass);
    renderPass.shader.pop();

    UnbindTexture(renderPass);
}
