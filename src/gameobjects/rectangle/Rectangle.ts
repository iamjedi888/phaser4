import { AddQuadVertex } from '../../components/vertices/AddQuadVertex';
import { BatchTexturedQuadBuffer } from '../../renderer/webgl1/draw/BatchTexturedQuadBuffer';
import { Container } from '../container/Container';
import { Flush } from '../../renderer/webgl1/renderpass/Flush';
import { Frame } from '../../textures/Frame';
import { ICanvasRenderer } from '../../renderer/canvas/ICanvasRenderer';
import { IGameObject } from '../IGameObject';
import { IRenderPass } from '../../renderer/webgl1/renderpass/IRenderPass';
import { SetExtentFromFrame } from '../../textures/SetExtentFromFrame';
import { SetShader } from '../../renderer/webgl1/renderpass/SetShader';
import { SetVertexUVsFromFrame } from '../../textures/SetVertexUVsFromFrame';
import { Texture } from '../../textures/Texture';
import { WhiteTexture } from '../../textures';
import { WillRender } from '../../components/permissions/WillRender';

export class Rectangle extends Container
{
    readonly type: string = 'Rectangle';

    private texture: Texture;
    private frame: Frame;

    constructor (x: number, y: number, width: number = 64, height: number = 64, color: number = 0xffffff)
    {
        super(x, y);

        const id = this.id;

        AddQuadVertex(id);

        this.texture = WhiteTexture.get();

        this.frame = this.texture.getFrame();

        SetExtentFromFrame(this, this.frame);
        SetVertexUVsFromFrame(id, this.frame);

        this.size.set(width, height);

        this.color.tint = color;
    }

    isRenderable (): boolean
    {
        return (this.visible && WillRender(this.id) && this.alpha > 0);
    }

    renderGL <T extends IRenderPass> (renderPass: T): void
    {
        const color = this.color;

        if (this.shader)
        {
            Flush(renderPass);

            SetShader(this.shader, 0);
        }

        if (color.colorMatrixEnabled)
        {
            renderPass.colorMatrix.set(color);
        }

        this.preRenderGL(renderPass);

        BatchTexturedQuadBuffer(this.texture, this.id, renderPass);

        if (color.colorMatrixEnabled && !color.willColorChildren)
        {
            Flush(renderPass);

            renderPass.colorMatrix.pop();
        }
    }

    renderCanvas <T extends ICanvasRenderer> (renderer: T): void
    {
        // PreRenderVertices(this);

        // DrawImage(this.frame, this.alpha, this.worldTransform, this.transformExtent, renderer);
    }

    destroy (reparentChildren?: IGameObject): void
    {
        super.destroy(reparentChildren);

        this.texture = null;
        this.frame = null;
    }
}
