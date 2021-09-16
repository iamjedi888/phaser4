import { AddQuadVertex } from '../../components/vertices/AddQuadVertex';
import { BatchTexturedQuadBuffer } from '../../renderer/webgl1/draw/BatchTexturedQuadBuffer';
import { ClearDirtyChildCache } from '../../components/dirty/ClearDirtyChildCache';
import { Color } from '../../components/color/Color';
import { DrawTexturedQuadFlipped } from '../../renderer/webgl1/draw/DrawTexturedQuadFlipped';
import { Flush } from '../../renderer/webgl1/renderpass/Flush';
import { GLTextureBinding } from '../../renderer/webgl1/textures/GLTextureBinding';
import { GetHeight } from '../../config/size/GetHeight';
import { GetResolution } from '../../config/size/GetResolution';
import { GetWidth } from '../../config/size/GetWidth';
import { HasDirtyChildCache } from '../../components/dirty/HasDirtyChildCache';
import { IRenderLayer } from './IRenderLayer';
import { IRenderPass } from '../../renderer/webgl1/renderpass/IRenderPass';
import { Layer } from '../layer/Layer';
import { PopColor } from '../../renderer/webgl1/renderpass/PopColor';
import { SetColor } from '../../renderer/webgl1/renderpass/SetColor';
import { SetDirtyParents } from '../../components/dirty/SetDirtyParents';
import { SetInversedQuadFromCamera } from '../../components/vertices/SetInversedQuadFromCamera';
import { SetQuadPosition } from '../../components/vertices/SetQuadPosition';
import { SetWillCacheChildren } from '../../components/permissions/SetWillCacheChildren';
import { SetWillRenderChildren } from '../../components/permissions/SetWillRenderChildren';
import { Texture } from '../../textures/Texture';
import { WillCacheChildren } from '../../components/permissions/WillCacheChildren';

//  The RenderLayer works like a normal Layer, except it automatically caches
//  all of its renderable children to its own texture. The children are drawn
//  to the RenderLayers texture and then the RenderLayer texture is drawn to
//  the WebGL Renderer. You should use a RenderLayer if you've got a complex or
//  large set of Game Objects that don't update very often, where you would
//  benefit from not having to re-render every single child, every frame.

export class RenderLayer extends Layer implements IRenderLayer
{
    readonly type: string = 'RenderLayer';

    color: Color;

    texture: Texture;
    framebuffer: WebGLFramebuffer;

    constructor ()
    {
        super();

        const id = this.id;

        SetWillCacheChildren(id, true);
        SetWillRenderChildren(id, true);

        const width = GetWidth();
        const height = GetHeight();
        const resolution = GetResolution();

        //  TODO: Allow them to set this via a filterArea
        const texture = new Texture(null, width * resolution, height * resolution);

        texture.key = this.type + id.toString();

        const binding = new GLTextureBinding(texture, {
            createFramebuffer: true
        });

        AddQuadVertex(id, width, height);

        //  Flip the quad vertices instead of the texture UVs
        //  so the flipped UV coords don't mess-up our shaders

        SetQuadPosition(id, 0, height, 0, 0, width, 0, width, height);

        this.texture = texture;
        this.framebuffer = binding.framebuffer;

        this.color = new Color(id);
    }

    renderGL <T extends IRenderPass> (renderPass: T): void
    {
        const id = this.id;

        SetColor(renderPass, this.color);

        if (renderPass.isCameraDirty() || (WillCacheChildren(id) && HasDirtyChildCache(id)))
        {
            const texture = this.texture;

            if (texture.binding.isBound)
            {
                renderPass.textures.unbindTexture(texture);
            }

            Flush(renderPass);

            renderPass.framebuffer.set(this.framebuffer, true);
        }
    }

    postRenderGL <T extends IRenderPass> (renderPass: T): void
    {
        const id = this.id;
        const texture = this.texture;

        if (renderPass.isCameraDirty() || (WillCacheChildren(id) && HasDirtyChildCache(id)))
        {
            Flush(renderPass);

            renderPass.framebuffer.pop();

            ClearDirtyChildCache(id);

            SetDirtyParents(id);

            DrawTexturedQuadFlipped(renderPass, texture);

            SetInversedQuadFromCamera(id, renderPass.current2DCamera, texture.width, texture.height);
        }
        else
        {
            //  If we didn't draw to the FBO this frame we can batch our previous texture:
            BatchTexturedQuadBuffer(this.texture, id, renderPass);
        }

        PopColor(renderPass, this.color);
    }
}
