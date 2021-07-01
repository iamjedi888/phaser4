import { ColorComponent, SetTint } from '../../components/color';

import { AddVertex } from '../../components/vertices/AddVertex';
import { BatchTexturedQuad } from '../../renderer/webgl1/draw/BatchTexturedQuad';
import { Container } from '../container/Container';
import { Frame } from '../../textures/Frame';
import { GameObjectWorld } from '../../GameObjectWorld';
import { ICanvasRenderer } from '../../renderer/canvas/ICanvasRenderer';
import { IFrame } from '../../textures/IFrame';
import { IGameObject } from '../IGameObject';
import { IRenderPass } from '../../renderer/webgl1/renderpass/IRenderPass';
import { ISprite } from './ISprite';
import { ITexture } from '../../textures/ITexture';
import { PreRenderVertices } from '../../components/transform/PreRenderVertices';
import { QuadVertexComponent } from '../../components/vertices/QuadVertexComponent';
import { SetFrame } from './SetFrame';
import { SetTexture } from './SetTexture';
import { Texture } from '../../textures/Texture';
import { WillRender } from '../../components/permissions';
import { addComponent } from 'bitecs';

export class Sprite extends Container implements ISprite
{
    readonly type: string = 'Sprite';

    texture: Texture;
    frame: Frame;
    hasTexture: boolean = false;

    constructor (x: number, y: number, texture: string | Texture | Frame, frame?: string | number | Frame)
    {
        super(x, y);

        const id = this.id;

        addComponent(GameObjectWorld, QuadVertexComponent, id);

        QuadVertexComponent.tl[id] = AddVertex();
        QuadVertexComponent.bl[id] = AddVertex();
        QuadVertexComponent.br[id] = AddVertex();
        QuadVertexComponent.tr[id] = AddVertex();

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
        return ColorComponent.tint[this.id];
    }

    set tint (value: number)
    {
        SetTint(this.id, value);
    }

    destroy (reparentChildren?: IGameObject): void
    {
        super.destroy(reparentChildren);

        this.texture = null;
        this.frame = null;
        this.hasTexture = false;
    }
}
