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
import { PackColors } from '../../renderer/webgl1/colors/PackColors';
import { PreRenderVertices } from '../../components/transform/PreRenderVertices';
import { QuadVertexComponent } from '../../components/vertices/QuadVertexComponent';
import { SetDirtyVertexColors } from '../../components/dirty';
import { SetFrame } from './SetFrame';
import { SetTexture } from './SetTexture';
import { Texture } from '../../textures/Texture';
import { WillRender } from '../../components/permissions';
import { addComponent } from 'bitecs';

export class Sprite extends Container implements ISprite
{
    texture: Texture;
    frame: Frame;
    hasTexture: boolean = false;

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
        //  In World we need to run a system to pack all colors and
        //  another to update all UVs that have changed

        //  Also, move tint and alpha to component, so we can monitor them changing

        // PreRenderVertices(this);
        // PackColors(vertices);

        // GetQuadVertices(this.id);

        BatchTexturedQuad(this.texture, this.id, renderPass);
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

            // this.vertices.forEach(vertex =>
            // {
            //     vertex.setTint(value);
            // });

            SetDirtyVertexColors(this.id);
        }
    }

    toString (): string
    {
        return `[ Sprite id="${this.id}" texture="${this.texture.key}" frame="${this.frame.key}" x="${this.x}" y="${this.y}" ]`;
    }

    destroy (reparentChildren?: IGameObject): void
    {
        super.destroy(reparentChildren);

        // this.vertices.length = 0;
        this.texture = null;
        this.frame = null;
        this.hasTexture = false;
    }
}
