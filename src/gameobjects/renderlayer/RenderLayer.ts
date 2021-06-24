import { ClearDirtyChildCache, HasDirtyChildCache } from '../../components/dirty';
import { GetHeight, GetResolution, GetWidth } from '../../config/size';
import { SetWillCacheChildren, WillCacheChildren } from '../../components/permissions';

import { CreateFramebuffer } from '../../renderer/webgl1/fbo/CreateFramebuffer';
import { DrawTexturedQuad } from '../../renderer/webgl1/draw/DrawTexturedQuad';
import { Flush } from '../../renderer/webgl1/renderpass';
import { GLTextureBinding } from '../../renderer/webgl1/textures/GLTextureBinding';
import { IRenderLayer } from './IRenderLayer';
import { IRenderPass } from '../../renderer/webgl1/renderpass/IRenderPass';
import { Layer } from '../layer/Layer';
import { Texture } from '../../textures/Texture';

//  The RenderLayer works like a normal Layer, except it automatically caches
//  all of its renderable children to its own texture. The children are drawn
//  to the RenderLayers texture and then the RenderLayer texture is drawn to
//  the WebGL Renderer. You should use a RenderLayer if you've got a complex or
//  large set of Game Objects that don't update very often, where you would
//  benefit from not having to re-render every single child, every frame.

export class RenderLayer extends Layer implements IRenderLayer
{
    texture: Texture;
    framebuffer: WebGLFramebuffer;

    constructor ()
    {
        super();

        SetWillCacheChildren(true, this);

        const width = GetWidth();
        const height = GetHeight();
        const resolution = GetResolution();

        //  TODO: Allow them to set this via a filterArea
        //  TODO: This code is duplicate of Shader constructor, consolidate
        const texture = new Texture(null, width * resolution, height * resolution);

        const binding = new GLTextureBinding(texture);

        texture.binding = binding;

        binding.framebuffer = CreateFramebuffer(binding.texture);

        this.texture = texture;
        this.framebuffer = binding.framebuffer;
    }

    renderGL <T extends IRenderPass> (renderPass: T): void
    {
        const id = this.id;

        if (this.getNumChildren() && (!WillCacheChildren(id) || HasDirtyChildCache(id)))
        {
            Flush(renderPass);

            renderPass.framebuffer.set(this.framebuffer, true);
        }
    }

    postRenderGL <T extends IRenderPass> (renderPass: T): void
    {
        const id = this.id;

        if (!WillCacheChildren(id) || HasDirtyChildCache(id))
        {
            Flush(renderPass);

            renderPass.framebuffer.pop();

            ClearDirtyChildCache(id);
        }

        DrawTexturedQuad(renderPass, this.texture);
    }
}
