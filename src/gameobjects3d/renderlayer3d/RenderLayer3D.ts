import { Flush, PopFramebuffer, SetFramebuffer } from '../../renderer/webgl1/renderpass';
import { GetHeight, GetResolution, GetWidth } from '../../config/size';

import { CreateDepthBuffer } from '../../renderer/webgl1/fbo/CreateDepthBuffer';
import { CreateFramebuffer } from '../../renderer/webgl1/fbo/CreateFramebuffer';
import { DIRTY_CONST } from '../../gameobjects/DIRTY_CONST';
import { DrawTexturedQuad } from '../../renderer/webgl1/draw/DrawTexturedQuad';
import { GLTextureBinding } from '../../renderer/webgl1/textures/GLTextureBinding';
import { IRenderLayer3D } from './IRenderLayer3D';
import { IRenderPass } from '../../renderer/webgl1/renderpass/IRenderPass';
import { Layer } from '../../gameobjects/layer/Layer';
import { Texture } from '../../textures/Texture';

export class RenderLayer3D extends Layer implements IRenderLayer3D
{
    texture: Texture;
    framebuffer: WebGLFramebuffer;

    constructor ()
    {
        super();

        this.willRender = true;
        this.willRenderChildren = true;
        this.willCacheChildren = true;

        this.setDirty(DIRTY_CONST.CHILD_CACHE);

        const width = GetWidth();
        const height = GetHeight();
        const resolution = GetResolution();

        //  TODO: Allow them to set this via a filterArea
        //  TODO: This code is duplicate of Shader constructor, consolidate
        const texture = new Texture(null, width * resolution, height * resolution);

        const binding = new GLTextureBinding(texture);

        texture.binding = binding;

        binding.framebuffer = CreateFramebuffer(binding.texture);
        binding.depthbuffer = CreateDepthBuffer(binding.framebuffer, texture.width, texture.height);

        this.texture = texture;
        this.framebuffer = binding.framebuffer;
    }

    renderGL <T extends IRenderPass> (renderPass: T): void
    {
        if (this.numChildren > 0)
        {
            Flush(renderPass);

            if (!this.willCacheChildren || this.isDirty(DIRTY_CONST.CHILD_CACHE))
            {
                //  This RenderLayer has dirty children
                SetFramebuffer(renderPass, this.framebuffer, true);

                this.clearDirty(DIRTY_CONST.CHILD_CACHE);
            }
            else
            {
                //  This RenderLayer doesn't have any dirty children, so we'll use the previous fbo contents
                SetFramebuffer(renderPass, this.framebuffer, false);

                this.postRenderGL(renderPass);
            }
        }
    }

    postRenderGL <T extends IRenderPass> (renderPass: T): void
    {
        Flush(renderPass);

        PopFramebuffer(renderPass);

        DrawTexturedQuad(renderPass, this.texture);

        this.clearDirty(DIRTY_CONST.TRANSFORM);
    }
}
