import { AlphaTexture } from '../../../textures/AlphaTexture';
import { BatchSingleQuad } from './BatchSingleQuad';
import { Flush } from '../renderpass/Flush';
import { IRenderPass } from '../renderpass/IRenderPass';
import { IShader } from '../shaders/IShader';
import { PopShader } from '../renderpass/PopShader';
import { SetShader } from '../renderpass/SetShader';

export function DrawShaderQuad (renderPass: IRenderPass, shader: IShader): void
{
    //  Clear out anything already in the batch
    Flush(renderPass);

    renderPass.textures.clear();

    const alpha = AlphaTexture.get();

    renderPass.textures.bind(alpha, 0);

    SetShader(shader, 0);

    const view = shader.viewport;

    BatchSingleQuad(renderPass, 0, 0, view.width, view.height, 0, 0, 1, 1, 0);

    //  Flush our single quad and unbind it
    Flush(renderPass);

    renderPass.textures.unbindTexture(alpha);

    PopShader();
}
