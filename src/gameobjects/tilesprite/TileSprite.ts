import { AddQuadVertex } from '../../components/vertices/AddQuadVertex';
import { BatchTexturedQuadBuffer } from '../../renderer/webgl1/draw/BatchTexturedQuadBuffer';
import { Container } from '../container/Container';
import { Flush } from '../../renderer/webgl1/renderpass/Flush';
import { Frame } from '../../textures/Frame';
import { ICanvasRenderer } from '../../renderer/canvas/ICanvasRenderer';
import { IFrame } from '../../textures/IFrame';
import { IGameObject } from '../IGameObject';
import { IRenderPass } from '../../renderer/webgl1/renderpass/IRenderPass';
import { ITexture } from '../../textures/ITexture';
import { ITileSprite } from './ITileSprite';
import { PopColorMatrix } from '../../renderer/webgl1/renderpass/PopColorMatrix';
import { SetColorMatrix } from '../../renderer/webgl1/renderpass/SetColorMatrix';
import { SetFrame } from '../../textures/SetFrame';
import { SetQuadPosition } from '../../components/vertices/SetQuadPosition';
import { SetShader } from '../../renderer/webgl1/renderpass/SetShader';
import { SetTexture } from '../../textures/SetTexture';
import { Texture } from '../../textures/Texture';
import { TileSpriteQuadShader } from '../../renderer/webgl1/shaders/TileSpriteQuadShader';
import { WillRender } from '../../components/permissions/WillRender';

export class TileSprite extends Container implements ITileSprite
{
    readonly type: string = 'TileSprite';

    texture: Texture;
    frame: Frame;
    hasTexture: boolean = false;

    constructor (x: number, y: number, texture: string | Texture | Frame = '__BLANK', frame?: string | number | Frame)
    {
        super(x, y);

        this.shader = new TileSpriteQuadShader();

        AddQuadVertex(this.id);

        this.setTexture(texture, frame);
    }

    setTexture <T extends ITexture, F extends IFrame> (key: string | T | F, frame?: string | number | F): this
    {
        SetTexture(key, frame, this);

        //  Flip the quad vertices instead of the texture UVs
        //  so the flipped UV coords don't mess-up our shaders

        SetQuadPosition(this.id, 0, this.frame.height, 0, 0, this.frame.width, 0, this.frame.width, this.frame.height);

        return this;
    }

    setFrame <F extends IFrame> (key?: string | number | F): this
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
