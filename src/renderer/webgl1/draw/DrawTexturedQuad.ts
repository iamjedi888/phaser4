import { BatchSingleQuad } from './BatchSingleQuad';
import { Flush } from '../renderpass/Flush';
import { IRenderPass } from '../renderpass/IRenderPass';
import { IShader } from '../shaders/IShader';
import { Texture } from '../../../textures/Texture';

export function DrawTexturedQuad (renderPass: IRenderPass, texture: Texture, shader?: IShader): void
{
    if (!shader)
    {
        shader = renderPass.quadShader;
    }

    const { u0, v0, u1, v1 } = texture.firstFrame;

    //  Clear out anything already in the batch
    Flush(renderPass);

    renderPass.textures.clear();

    renderPass.textures.bind(texture, 0);

    renderPass.shader.set(shader, 0);

    BatchSingleQuad(renderPass, 0, 0, texture.width, texture.height, u0, v0, u1, v1, 0);

    //  Flush our single quad
    Flush(renderPass);

    renderPass.shader.pop();

    renderPass.textures.unbind();
}
