import { BatchTexturedQuad } from '../../renderer/webgl1/draw/BatchTexturedQuad';
import { Container } from '../container/Container';
import { DIRTY_CONST } from '../DIRTY_CONST';
import { DrawImage } from '../../renderer/canvas/draw/DrawImage';
import { Frame } from '../../textures/Frame';
import { ICanvasRenderer } from '../../renderer/canvas/ICanvasRenderer';
import { IGameObject } from '../IGameObject';
import { IRectangle } from './IRectangle';
import { IRenderPass } from '../../renderer/webgl1/renderpass/IRenderPass';
import { PreRenderVertices } from '../../components/transform/PreRenderVertices';
import { Texture } from '../../textures/Texture';
import { TextureManagerInstance } from '../../textures/TextureManagerInstance';
import { Vertex } from '../../components/Vertex';

export class Rectangle extends Container implements IRectangle
{
    private texture: Texture;
    private frame: Frame;

    protected _color: number = 0xffffff;

    constructor (x: number, y: number, width: number = 64, height: number = 64, color: number = 0xffffff)
    {
        super(x, y);

        this.type = 'Rectangle';

        this.vertices = [ new Vertex(), new Vertex(), new Vertex(), new Vertex() ];

        this.color = color;

        this.setWhiteTexture();
        this.setSize(width, height);
    }

    private setWhiteTexture (): void
    {
        this.texture = TextureManagerInstance.get().get('__WHITE');
        this.frame = this.texture.getFrame();

        this.frame.copyToExtent(this);
        this.frame.copyToVertices(this.vertices);
    }

    setColor (color: number): this
    {
        this.color = color;

        return this;
    }

    isRenderable (): boolean
    {
        return (this.visible && this.willRender && this.alpha > 0);
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

    get color (): number
    {
        return this._color;
    }

    set color (value: number)
    {
        if (value !== this._color)
        {
            this._color = value;

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
    }
}
