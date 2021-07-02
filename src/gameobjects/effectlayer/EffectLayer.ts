import { BatchTexturedQuad } from '../../renderer/webgl1/draw/BatchTexturedQuad';
import { DrawTexturedQuad } from '../../renderer/webgl1/draw/DrawTexturedQuad';
import { Flush } from '../../renderer/webgl1/renderpass/Flush';
import { IEffectLayer } from './IEffectLayer';
import { IRectangle } from '../../geom/rectangle/IRectangle';
import { IRenderPass } from '../../renderer/webgl1/renderpass/IRenderPass';
import { IShader } from '../../renderer/webgl1/shaders/IShader';
import { RenderLayer } from '../renderlayer/RenderLayer';

//  A WebGL specific EffectLayer
//  EffectLayerCanvas is a canvas alternative

export class EffectLayer extends RenderLayer implements IEffectLayer
{
    readonly type: string = 'EffectLayer';

    filterArea: IRectangle;

    shaders: IShader[] = [];

    constructor (...shaders: IShader[])
    {
        super();

        if (Array.isArray(shaders))
        {
            this.shaders = shaders;
        }
    }

    postRenderGL <T extends IRenderPass> (renderPass: T): void
    {
        const id = this.id;
        const shaders = this.shaders;
        const texture = this.texture;

        Flush(renderPass);

        renderPass.framebuffer.pop();

        //  this.framebuffer contains a texture with all of this layers sprites drawn to it

        if (shaders.length === 0)
        {
            BatchTexturedQuad(texture, id, renderPass);
        }
        else
        {
            renderPass.textures.clear();

            // renderPass.viewport.set(0, 0, 400, 600);

            let prevTexture = texture;

            for (let i: number = 0; i < shaders.length; i++)
            {
                const shader = shaders[i];

                DrawTexturedQuad(renderPass, prevTexture, shader);

                prevTexture = shader.texture;
            }

            DrawTexturedQuad(renderPass, prevTexture);

            // renderPass.viewport.pop();
        }
    }
}
