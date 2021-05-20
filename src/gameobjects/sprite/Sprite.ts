import { BatchTexturedQuad } from '../../renderer/webgl1/draw/BatchTexturedQuad';
import { Container } from '../container/Container';
import { DIRTY_CONST } from '../DIRTY_CONST';
import { DrawImage } from '../../renderer/canvas/draw/DrawImage';
import { Frame } from '../../textures/Frame';
import { ICanvasRenderer } from '../../renderer/canvas/ICanvasRenderer';
import { IFrame } from '../../textures/IFrame';
import { IGameObject } from '../IGameObject';
import { IRenderPass } from '../../renderer/webgl1/renderpass/IRenderPass';
import { ISprite } from './ISprite';
import { ITexture } from '../../textures/ITexture';
import { PreRenderVertices } from '../../components/transform/PreRenderVertices';
import { SetFrame } from './SetFrame';
import { SetTexture } from './SetTexture';
import { Texture } from '../../textures/Texture';
import { Vertex } from '../../components/Vertex';

export class Sprite extends Container implements ISprite
{
    texture: Texture;
    frame: Frame;
    hasTexture: boolean = false;

    protected _tint: number = 0xffffff;

    constructor (x: number, y: number, texture: string | Texture | Frame, frame?: string | number | Frame)
    {
        super(x, y);

        this.vertices = [ new Vertex(), new Vertex(), new Vertex(), new Vertex() ];

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
        return (this.visible && this.willRender && this.hasTexture && this.alpha > 0);
    }

    renderGL <T extends IRenderPass> (renderPass: T): void
    {
        PreRenderVertices(this);

        BatchTexturedQuad(this.texture, this.vertices, renderPass);
    }

    renderCanvas <T extends ICanvasRenderer> (renderer: T): void
    {
        PreRenderVertices(this);

        DrawImage(this.frame, this.alpha, this.worldTransform, this.transformExtent, renderer);
    }

    get tint (): number
    {
        return this._tint;
    }

    set tint (value: number)
    {
        if (value !== this._tint)
        {
            this._tint = value;

            this.vertices.forEach(vertex =>
            {
                vertex.setTint(value);
            });

            this.setDirty(DIRTY_CONST.COLORS);
        }
    }

    destroy (reparentChildren?: IGameObject): void
    {
        super.destroy(reparentChildren);

        this.texture = null;
        this.frame = null;
        this.hasTexture = false;
    }
}
