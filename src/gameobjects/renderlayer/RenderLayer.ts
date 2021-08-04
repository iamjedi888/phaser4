import { BatchSingleQuad, BatchTexturedQuadBuffer, DrawTexturedQuad } from '../../renderer/webgl1/draw';

import { AddQuadVertex } from '../../components/vertices/AddQuadVertex';
import { BatchTexturedQuad } from '../../renderer/webgl1/draw/BatchTexturedQuad';
import { ClearDirtyChildCache } from '../../components/dirty/ClearDirtyChildCache';
import { Flush } from '../../renderer/webgl1/renderpass/Flush';
import { GLTextureBinding } from '../../renderer/webgl1/textures/GLTextureBinding';
import { GameObjectWorld } from '../../GameObjectWorld';
import { GetHeight } from '../../config/size/GetHeight';
import { GetResolution } from '../../config/size/GetResolution';
import { GetWidth } from '../../config/size/GetWidth';
import { HasDirtyChildCache } from '../../components/dirty/HasDirtyChildCache';
import { IRenderLayer } from './IRenderLayer';
import { IRenderPass } from '../../renderer/webgl1/renderpass/IRenderPass';
import { Layer } from '../layer/Layer';
import { SetDirtyParents } from '../../components/dirty/SetDirtyParents';
import { SetWillCacheChildren } from '../../components/permissions/SetWillCacheChildren';
import { Texture } from '../../textures/Texture';
import { WillCacheChildren } from '../../components/permissions/WillCacheChildren';
import { addComponent } from 'bitecs';

//  The RenderLayer works like a normal Layer, except it automatically caches
//  all of its renderable children to its own texture. The children are drawn
//  to the RenderLayers texture and then the RenderLayer texture is drawn to
//  the WebGL Renderer. You should use a RenderLayer if you've got a complex or
//  large set of Game Objects that don't update very often, where you would
//  benefit from not having to re-render every single child, every frame.

export class RenderLayer extends Layer implements IRenderLayer
{
    readonly type: string = 'RenderLayer';

    texture: Texture;
    framebuffer: WebGLFramebuffer;

    constructor ()
    {
        super();

        SetWillCacheChildren(true, this);

        const width = GetWidth();
        const height = GetHeight();
        const resolution = GetResolution();

        const id = this.id;

        //  TODO: Allow them to set this via a filterArea
        const texture = new Texture(null, width * resolution, height * resolution);

        texture.key = this.type + id.toString();

        const binding = new GLTextureBinding(texture, {
            createFramebuffer: true,
            flipY: true
        });

        AddQuadVertex(id, width, height, true);

        this.texture = texture;
        this.framebuffer = binding.framebuffer;
    }

    renderGL <T extends IRenderPass> (renderPass: T): void
    {
        const id = this.id;

        // if (this.getNumChildren() && (!WillCacheChildren(id) || HasDirtyChildCache(id)))
        // {
            Flush(renderPass);

            renderPass.framebuffer.set(this.framebuffer, true);

            // renderPass.framebuffer.set(this.framebuffer, true);
        // }
    }

    postRenderGL <T extends IRenderPass> (renderPass: T): void
    {
        const id = this.id;

        // if (!WillCacheChildren(id) || HasDirtyChildCache(id))
        // {
            Flush(renderPass);

            renderPass.framebuffer.pop();

            // ClearDirtyChildCache(id);

            // SetDirtyParents(id);
        // }

        //  If we didn't draw to the FBO this frame we can use this:
        // BatchTexturedQuadBuffer(this.texture, id, renderPass);

        //  Otherwise, we have to use this:
        DrawTexturedQuad(renderPass, this.texture);
    }
}
