import { BatchSingleQuad } from './BatchSingleQuad';
import { BindWebGLTexture } from '../renderpass/BindWebGLTexture';
import { ClearWebGLTextures } from '../renderpass/ClearWebGLTextures';
import { Flush } from '../renderpass/Flush';
import { IRenderPass } from '../renderpass/IRenderPass';
import { IShader } from '../shaders/IShader';
import { PopShader } from '../renderpass/PopShader';
import { SetShader } from '../renderpass/SetShader';
import { Texture } from '../../../textures/Texture';
import { UnbindTexture } from '../renderpass/UnbindTexture';

export function DrawTexturedQuad (renderPass: IRenderPass, texture: Texture, shader?: IShader): void
{
    if (!shader)
    {
        shader = renderPass.quadShader;
    }

    const { u0, v0, u1, v1 } = texture.firstFrame;

    //  Clear out anything already in the batch
    Flush(renderPass);

    ClearWebGLTextures();

    BindWebGLTexture(texture, 0);

    SetShader(shader, 0);

    const camera = renderPass.current2DCamera;

    const x = camera.getBoundsX();
    const y = camera.getBoundsY();

    BatchSingleQuad(renderPass, x, y, texture.width, texture.height, u0, v0, u1, v1, 0);

    //  Flush our single quad and unbind it
    Flush(renderPass);

    UnbindTexture(texture);

    PopShader();
}
