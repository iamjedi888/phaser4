import { AlphaTexture } from '../../../textures/AlphaTexture';
import { BatchSingleQuad } from './BatchSingleQuad';
import { BindWebGLTexture } from '../renderpass/BindWebGLTexture';
import { ClearWebGLTextures } from '../renderpass/ClearWebGLTextures';
import { Flush } from '../renderpass/Flush';
import { IRenderPass } from '../renderpass/IRenderPass';
import { IShader } from '../shaders/IShader';
import { PopShader } from '../renderpass/PopShader';
import { SetShader } from '../renderpass/SetShader';
import { UnbindTexture } from '../renderpass/UnbindTexture';

export function DrawShaderQuad (renderPass: IRenderPass, shader: IShader): void
{
    //  Clear out anything already in the batch
    Flush(renderPass);

    ClearWebGLTextures();

    const alpha = AlphaTexture.get();

    BindWebGLTexture(alpha, 0);

    SetShader(shader, 0);

    const view = shader.viewport;

    BatchSingleQuad(renderPass, 0, 0, view.width, view.height, 0, 0, 1, 1, 0);

    //  Flush our single quad and unbind it
    Flush(renderPass);

    UnbindTexture(alpha);

    PopShader();
}
