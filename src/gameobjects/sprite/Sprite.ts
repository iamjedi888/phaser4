import { AddQuadVertex } from '../../components/vertices/AddQuadVertex';
import { BatchTexturedQuadBuffer } from '../../renderer/webgl1/draw/BatchTexturedQuadBuffer';
import { Container } from '../container/Container';
import { Flush } from '../../renderer/webgl1/renderpass/Flush';
import { Frame } from '../../textures/Frame';
import { ICanvasRenderer } from '../../renderer/canvas/ICanvasRenderer';
import { IFrame } from '../../textures/IFrame';
import { IGameObject } from '../IGameObject';
import { IRenderPass } from '../../renderer/webgl1/renderpass/IRenderPass';
import { ISprite } from './ISprite';
import { ITexture } from '../../textures/ITexture';
import { PopColorMatrix } from '../../renderer/webgl1/renderpass/PopColorMatrix';
import { SetColorMatrix } from '../../renderer/webgl1/renderpass/SetColorMatrix';
import { SetFrame } from './SetFrame';
import { SetShader } from '../../renderer/webgl1/renderpass/SetShader';
import { SetTexture } from './SetTexture';
import { Texture } from '../../textures/Texture';
import { WillRender } from '../../components/permissions/WillRender';

export class Sprite extends Container implements ISprite
{
    readonly type: string = 'Sprite';

    texture: Texture;
    frame: Frame;
    hasTexture: boolean = false;

    constructor (x: number, y: number, texture: string | Texture | Frame = '__BLANK', frame?: string | number | Frame)
    {
        super(x, y);

        AddQuadVertex(this.id);

        this.setTexture(texture, frame);
    }

    setTexture (key: string | ITexture | IFrame, frame?: string | number | IFrame): this
    {
        SetTexture(key, frame, this);

        return this;
    }

    setFrame (key?: string | number | IFrame): this
    {
        SetFrame(this.texture, key, this);

        return this;
    }

    isRenderable (): boolean
    {
        return (this.visible && this.hasTexture && WillRender(this.id) && this.alpha > 0);
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
            SetColorMatrix(color);
        }

        this.preRenderGL(renderPass);

        BatchTexturedQuadBuffer(this.texture, this.id, renderPass);

        if (color.colorMatrixEnabled && !color.willColorChildren)
        {
            Flush(renderPass);

            PopColorMatrix();
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
        this.hasTexture = false;
    }
}
