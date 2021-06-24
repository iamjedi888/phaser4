import { BatchSingleQuad } from './BatchSingleQuad';
import { Flush } from '../renderpass';
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

    //  Clear out anything already in the batch
    Flush(renderPass);

    renderPass.textures.bind(texture, 0);

    renderPass.vertexbuffer.set(renderPass.quadBuffer);

    renderPass.shader.set(shader, 0);

    BatchSingleQuad(renderPass, 0, 0, texture.width, texture.height, u0, v0, u1, v1, 0);

    //  Flush our single quad
    Flush(renderPass);

    //  Should always pop the vbo first, so when the shader is popped the attributes are set correctly
    renderPass.vertexbuffer.pop();

    renderPass.shader.pop();

    renderPass.textures.unbind();
}
