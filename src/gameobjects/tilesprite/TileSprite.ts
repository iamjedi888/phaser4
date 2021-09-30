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
import { IVec2 } from '../../math/vec2/IVec2';
import { PopColorMatrix } from '../../renderer/webgl1/renderpass/PopColorMatrix';
import { SetColorMatrix } from '../../renderer/webgl1/renderpass/SetColorMatrix';
import { SetExtent } from '../../components/transform/SetExtent';
import { SetFrame } from '../../textures/SetFrame';
import { SetQuadUVs } from '../../components/vertices/SetQuadUVs';
import { SetShader } from '../../renderer/webgl1/renderpass/SetShader';
import { SetTexture } from '../../textures/SetTexture';
import { Texture } from '../../textures/Texture';
import { TileSpriteQuadShader } from '../../renderer/webgl1/shaders/TileSpriteQuadShader';
import { Vec2 } from '../../math/vec2/Vec2';
import { WillRender } from '../../components/permissions/WillRender';

export class TileSprite extends Container implements ITileSprite
{
    readonly type: string = 'TileSprite';

    texture: Texture;
    frame: Frame;
    hasTexture: boolean = false;

    tileScale: IVec2;
    tilePosition: IVec2;

    constructor (x: number, y: number, texture: string | Texture | Frame = '__BLANK', frame?: string | number | Frame)
    {
        super(x, y);

        this.tileScale = new Vec2(1, 1);
        this.tilePosition = new Vec2(0, 0);

        this.shader = new TileSpriteQuadShader(this);

        AddQuadVertex(this.id);

        this.setTexture(texture, frame);

        //  This needs to be the full texture size, not the frame UVs
        SetQuadUVs(this.id, 0, 0, 1, 1);

        //  This is the size we want it displayed at (move to constructor)
        SetExtent(this.id, 0, 0, 512, 512);
    }

    setTexture <T extends ITexture, F extends IFrame> (key: string | T | F, frame?: string | number | F): this
    {
        SetTexture(key, frame, this);

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
