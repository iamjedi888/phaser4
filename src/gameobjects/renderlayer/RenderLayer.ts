import { AddQuadVertex } from '../../components/vertices/AddQuadVertex';
import { BatchTexturedQuadBuffer } from '../../renderer/webgl1/draw/BatchTexturedQuadBuffer';
import { ClearDirty } from '../../components/dirty/ClearDirty';
import { ClearDirtyChildCache } from '../../components/dirty/ClearDirtyChildCache';
import { Color } from '../../components/color/Color';
import { DrawTexturedQuadFlipped } from '../../renderer/webgl1/draw/DrawTexturedQuadFlipped';
import { Flush } from '../../renderer/webgl1/renderpass/Flush';
import { GLTextureBinding } from '../../renderer/webgl1/textures/GLTextureBinding';
import { GetHeight } from '../../config/size/GetHeight';
import { GetResolution } from '../../config/size/GetResolution';
import { GetWidth } from '../../config/size/GetWidth';
import { HasDirtyChildCache } from '../../components/dirty/HasDirtyChildCache';
import { IRectangle } from '../../geom/rectangle/IRectangle';
import { IRenderLayer } from './IRenderLayer';
import { IRenderPass } from '../../renderer/webgl1/renderpass/IRenderPass';
import { IsDirty } from '../../components/dirty/IsDirty';
import { Layer } from '../layer/Layer';
import { PopColor } from '../../renderer/webgl1/renderpass/PopColor';
import { PopFramebuffer } from '../../renderer/webgl1/renderpass/PopFramebuffer';
import { Rectangle } from '../../geom/rectangle/Rectangle';
import { SetColor } from '../../renderer/webgl1/renderpass/SetColor';
import { SetDirty } from '../../components/dirty/SetDirty';
import { SetDirtyChildCache } from '../../components/dirty/SetDirtyChildCache';
import { SetDirtyParents } from '../../components/dirty/SetDirtyParents';
import { SetFramebuffer } from '../../renderer/webgl1/renderpass/SetFramebuffer';
import { SetInversedQuadFromCamera } from '../../components/vertices/SetInversedQuadFromCamera';
import { SetQuadPosition } from '../../components/vertices/SetQuadPosition';
import { SetWillCacheChildren } from '../../components/permissions/SetWillCacheChildren';
import { SetWillRenderChildren } from '../../components/permissions/SetWillRenderChildren';
import { Texture } from '../../textures/Texture';

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

    viewport: IRectangle;

    private _x: number;
    private _y: number;

    constructor (x: number = 0, y: number = 0, width: number = GetWidth(), height: number = GetHeight(), resolution: number = GetResolution())
    {
        super();

        const id = this.id;

        SetWillCacheChildren(id, true);
        SetWillRenderChildren(id, true);

        const texture = new Texture(null, width * resolution, height * resolution);

        texture.key = `${this.type}${id}`;

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

        this.x = x;
        this.y = y;

        this.viewport = new Rectangle();
    }

    set x (value: number)
    {
        this._x = value;

        SetDirty(this.id);
    }

    get x (): number
    {
        return this._x;
    }

    set y (value: number)
    {
        this._y = value;

        SetDirty(this.id);
    }

    get y (): number
    {
        return this._y;
    }

    renderGL <T extends IRenderPass> (renderPass: T): void
    {
        const id = this.id;
        const view = this.viewport;
        const texture = this.texture;

        if (IsDirty(id))
        {
            const rendererHeight = renderPass.renderer.height;

            view.set(
                -this.x,
                -(rendererHeight - texture.height - this.y),
                renderPass.renderer.width,
                rendererHeight
            );

            SetDirtyChildCache(id);
        }

        SetColor(renderPass, this.color);

        if (renderPass.isCameraDirty() || HasDirtyChildCache(id))
        {
            SetDirty(id);

            if (texture.binding.isBound)
            {
                renderPass.textures.unbindTexture(texture);
            }

            Flush(renderPass);

            SetFramebuffer(this.framebuffer, true, view);
        }
    }

    postRenderGL <T extends IRenderPass> (renderPass: T): void
    {
        const id = this.id;
        const texture = this.texture;

        if (IsDirty(id))
        {
            Flush(renderPass);

            PopFramebuffer();

            ClearDirty(id);
            ClearDirtyChildCache(id);

            SetDirtyParents(id);

            SetInversedQuadFromCamera(id, renderPass.current2DCamera, this.x, this.y, texture.width, texture.height);

            DrawTexturedQuadFlipped(renderPass, texture, this.x, this.y);
        }
        else
        {
            //  If we didn't draw to the FBO this frame we can batch our previous texture:
            BatchTexturedQuadBuffer(this.texture, id, renderPass);
        }

        PopColor(renderPass, this.color);
    }
}
