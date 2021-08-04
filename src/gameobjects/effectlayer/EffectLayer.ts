import { BatchTexturedQuadBuffer } from '../../renderer/webgl1/draw/BatchTexturedQuadBuffer';
import { ClearDirtyChildCache } from '../../components/dirty/ClearDirtyChildCache';
import { DrawTexturedQuad } from '../../renderer/webgl1/draw/DrawTexturedQuad';
import { Flush } from '../../renderer/webgl1/renderpass/Flush';
import { HasDirtyChildCache } from '../../components/dirty/HasDirtyChildCache';
import { IEffectLayer } from './IEffectLayer';
import { IRectangle } from '../../geom/rectangle/IRectangle';
import { IRenderPass } from '../../renderer/webgl1/renderpass/IRenderPass';
import { IShader } from '../../renderer/webgl1/shaders/IShader';
import { RenderLayer } from '../renderlayer/RenderLayer';
import { SetDirtyParents } from '../../components/dirty/SetDirtyParents';
import { WillCacheChildren } from '../../components/permissions/WillCacheChildren';

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

        if (WillCacheChildren(id) && HasDirtyChildCache(id))
        {
            Flush(renderPass);

            renderPass.framebuffer.pop();

            ClearDirtyChildCache(id);

            SetDirtyParents(id);
        }

        //  this.framebuffer contains a texture with all of this layers sprites drawn to it

        if (shaders.length === 0)
        {
            DrawTexturedQuad(renderPass, texture);
        }
        else
        {
            // renderPass.textures.clear();
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
