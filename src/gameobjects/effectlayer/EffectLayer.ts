import { BatchTexturedQuadBuffer } from '../../renderer/webgl1/draw/BatchTexturedQuadBuffer';
import { ClearDirty } from '../../components/dirty/ClearDirty';
import { ClearDirtyChildCache } from '../../components/dirty/ClearDirtyChildCache';
import { DrawTexturedQuadFlipped } from '../../renderer/webgl1/draw/DrawTexturedQuadFlipped';
import { Flush } from '../../renderer/webgl1/renderpass/Flush';
import { GetHeight } from '../../config/size/GetHeight';
import { GetResolution } from '../../config/size/GetResolution';
import { GetWidth } from '../../config/size/GetWidth';
import { IEffectLayer } from './IEffectLayer';
import { IRenderPass } from '../../renderer/webgl1/renderpass/IRenderPass';
import { IShader } from '../../renderer/webgl1/shaders/IShader';
import { IsDirty } from '../../components/dirty/IsDirty';
import { RenderLayer } from '../renderlayer/RenderLayer';
import { SetDirtyParents } from '../../components/dirty/SetDirtyParents';
import { SetInversedQuadFromCamera } from '../../components/vertices/SetInversedQuadFromCamera';

//  A WebGL specific EffectLayer

export class EffectLayer extends RenderLayer implements IEffectLayer
{
    readonly type: string = 'EffectLayer';

    shaders: IShader[] = [];

    constructor (width: number = GetWidth(), height: number = GetHeight(), resolution: number = GetResolution(), ...shaders: IShader[])
    {
        super(0, 0, width, height, resolution);

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

        if (IsDirty(id))
        {
            Flush(renderPass);

            renderPass.framebuffer.pop();

            ClearDirty(id);
            ClearDirtyChildCache(id);

            SetDirtyParents(id);

            SetInversedQuadFromCamera(id, renderPass.current2DCamera, this.x, this.y, texture.width, texture.height);
        }

        //  framebuffer contains a texture with all of this layers sprites drawn to it

        if (shaders.length === 0)
        {
            BatchTexturedQuadBuffer(texture, id, renderPass);
        }
        else
        {
            const x = this.x;
            const y = this.y;
            let prevTexture = texture;

            for (let i: number = 0; i < shaders.length; i++)
            {
                const shader = shaders[i];

                DrawTexturedQuadFlipped(renderPass, prevTexture, x, y, shader);

                prevTexture = shader.texture;
            }

            DrawTexturedQuadFlipped(renderPass, prevTexture, x, y);
        }
    }
}
