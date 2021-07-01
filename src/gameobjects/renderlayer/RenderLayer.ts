import { AddVertex, QuadVertexComponent } from '../../components/vertices';
import { ClearDirtyChildCache, HasDirtyChildCache, SetDirtyParents } from '../../components/dirty';
import { GetHeight, GetResolution, GetWidth } from '../../config/size';
import { SetWillCacheChildren, WillCacheChildren } from '../../components/permissions';

import { BatchTexturedQuad } from '../../renderer/webgl1/draw/BatchTexturedQuad';
import { Flush } from '../../renderer/webgl1/renderpass';
import { GLTextureBinding } from '../../renderer/webgl1/textures/GLTextureBinding';
import { GameObjectWorld } from '../../GameObjectWorld';
import { IRenderLayer } from './IRenderLayer';
import { IRenderPass } from '../../renderer/webgl1/renderpass/IRenderPass';
import { Layer } from '../layer/Layer';
import { Texture } from '../../textures/Texture';
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

        addComponent(GameObjectWorld, QuadVertexComponent, id);

        //  inversed UV coordinates:
        QuadVertexComponent.tl[id] = AddVertex(0, 0, 0, 0, 1);
        QuadVertexComponent.bl[id] = AddVertex(0, height, 0, 0, 0);
        QuadVertexComponent.br[id] = AddVertex(width, height, 0, 1, 0);
        QuadVertexComponent.tr[id] = AddVertex(width, 0, 0, 1, 1);

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

            SetDirtyParents(id);
        }

        BatchTexturedQuad(this.texture, id, renderPass);
    }
}
