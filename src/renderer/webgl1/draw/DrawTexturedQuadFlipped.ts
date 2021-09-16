import { BatchSingleQuadFlipped } from './BatchSingleQuadFlipped';
import { Flush } from '../renderpass/Flush';
import { IRenderPass } from '../renderpass/IRenderPass';
import { IShader } from '../shaders/IShader';
import { Texture } from '../../../textures/Texture';

export function DrawTexturedQuadFlipped (renderPass: IRenderPass, texture: Texture, x: number, y: number, shader?: IShader): void
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

    const camera = renderPass.current2DCamera;

    const cx = camera.getBoundsX() + x;
    const cy = camera.getBoundsY() + y;

    BatchSingleQuadFlipped(renderPass, cx, cy, texture.width, texture.height, u0, v0, u1, v1, 0);

    //  Flush our single quad and unbind it
    Flush(renderPass);

    renderPass.textures.unbindTexture(texture);

    renderPass.shader.pop();
}
