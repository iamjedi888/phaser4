import { AddVertex } from '../../components/vertices/AddVertex';
import { BatchTexturedQuad } from '../../renderer/webgl1/draw/BatchTexturedQuad';
import { Container } from '../container/Container';
import { DrawImage } from '../../renderer/canvas/draw/DrawImage';
import { Frame } from '../../textures/Frame';
import { GameObjectWorld } from '../../GameObjectWorld';
import { GetQuadVertices } from '../../components/transform/GetQuadVertices';
import { ICanvasRenderer } from '../../renderer/canvas/ICanvasRenderer';
import { IFrame } from '../../textures/IFrame';
import { IGameObject } from '../IGameObject';
import { IRenderPass } from '../../renderer/webgl1/renderpass/IRenderPass';
import { ISprite } from './ISprite';
import { ITexture } from '../../textures/ITexture';
import { PackColor } from '../../renderer/webgl1';
import { PackColors } from '../../renderer/webgl1/colors/PackColors';
import { PreRenderVertices } from '../../components/transform/PreRenderVertices';
import { QuadVertexComponent } from '../../components/vertices/QuadVertexComponent';
import { SetDirtyVertexColors } from '../../components/dirty';
import { SetFrame } from './SetFrame';
import { SetTexture } from './SetTexture';
import { Texture } from '../../textures/Texture';
import { VertexComponent } from '../../components/vertices';
import { WillRender } from '../../components/permissions';
import { addComponent } from 'bitecs';

export class Sprite extends Container implements ISprite
{
    readonly type: string = 'Sprite';

    texture: Texture;
    frame: Frame;
    hasTexture: boolean = false;

    protected _alpha: number = 1;
    protected _tint: number = 0xffffff;

    constructor (x: number, y: number, texture: string | Texture | Frame, frame?: string | number | Frame)
    {
        super(x, y);

        const id = this.id;

        addComponent(GameObjectWorld, QuadVertexComponent, id);

        QuadVertexComponent.v1[id] = AddVertex();
        QuadVertexComponent.v2[id] = AddVertex();
        QuadVertexComponent.v3[id] = AddVertex();
        QuadVertexComponent.v4[id] = AddVertex();

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

        BatchTexturedQuad(this.texture, this.id, renderPass);
    }

    renderCanvas <T extends ICanvasRenderer> (renderer: T): void
    {
        PreRenderVertices(this);

        // DrawImage(this.frame, this.alpha, this.worldTransform, this.transformExtent, renderer);
    }

    get tint (): number
    {
        return this._tint;
    }

    set tint (value: number)
    {
        if (value !== this._tint)
        {
            const id = this.id;

            this._tint = value;

            const v1 = QuadVertexComponent.v1[id];
            const v2 = QuadVertexComponent.v2[id];
            const v3 = QuadVertexComponent.v3[id];
            const v4 = QuadVertexComponent.v4[id];

            // VertexComponent.tint[v1] = value;
            // VertexComponent.tint[v2] = value;
            // VertexComponent.tint[v3] = value;
            // VertexComponent.tint[v4] = value;

            const color = PackColor(value, this.alpha);

            VertexComponent.color[v1] = color;
            VertexComponent.color[v2] = color;
            VertexComponent.color[v3] = color;
            VertexComponent.color[v4] = color;

            // SetDirtyVertexColors(this.id);
        }
    }

    get alpha (): number
    {
        return this._alpha;
    }

    set alpha (value: number)
    {
        if (value !== this._alpha)
        {
            const id = this.id;

            this._alpha = value;

            const v1 = QuadVertexComponent.v1[id];
            const v2 = QuadVertexComponent.v2[id];
            const v3 = QuadVertexComponent.v3[id];
            const v4 = QuadVertexComponent.v4[id];

            // VertexComponent.tint[v1] = value;
            // VertexComponent.tint[v2] = value;
            // VertexComponent.tint[v3] = value;
            // VertexComponent.tint[v4] = value;

            const color = PackColor(this._tint, value);

            VertexComponent.color[v1] = color;
            VertexComponent.color[v2] = color;
            VertexComponent.color[v3] = color;
            VertexComponent.color[v4] = color;

            // SetDirtyVertexColors(this.id);
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
