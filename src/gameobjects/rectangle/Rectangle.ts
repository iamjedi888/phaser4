import { AddVertex, QuadVertexComponent } from '../../components/vertices';

import { BatchTexturedQuad } from '../../renderer/webgl1/draw/BatchTexturedQuad';
import { ColorComponent } from '../../components/color/ColorComponent';
import { Container } from '../container/Container';
import { Frame } from '../../textures/Frame';
import { GameObjectWorld } from '../../GameObjectWorld';
import { ICanvasRenderer } from '../../renderer/canvas/ICanvasRenderer';
import { IGameObject } from '../IGameObject';
import { IRectangle } from './IRectangle';
import { IRenderPass } from '../../renderer/webgl1/renderpass/IRenderPass';
import { PreRenderVertices } from '../../components/transform/PreRenderVertices';
import { SetExtent } from '../../components/transform';
import { SetTexture } from '../sprite/SetTexture';
import { SetTint } from '../../components/color/SetTint';
import { Texture } from '../../textures/Texture';
import { TextureManagerInstance } from '../../textures/TextureManagerInstance';
import { WillRender } from '../../components/permissions/WillRender';
import { addComponent } from 'bitecs';

export class Rectangle extends Container implements IRectangle
{
    readonly type: string = 'Rectangle';

    private texture: Texture;
    private frame: Frame;

    constructor (x: number, y: number, width: number = 64, height: number = 64, color: number = 0xffffff)
    {
        super(x, y);

        const id = this.id;

        addComponent(GameObjectWorld, QuadVertexComponent, id);

        // QuadVertexComponent.tl[id] = AddVertex(x, y, 0, 0, 1);
        // QuadVertexComponent.bl[id] = AddVertex(x, y + height, 0, 0, 0);
        // QuadVertexComponent.br[id] = AddVertex(x + width, y + height, 0, 1, 0);
        // QuadVertexComponent.tr[id] = AddVertex(x + width, y, 0, 1, 1);

        QuadVertexComponent.tl[id] = AddVertex();
        QuadVertexComponent.bl[id] = AddVertex();
        QuadVertexComponent.br[id] = AddVertex();
        QuadVertexComponent.tr[id] = AddVertex();

        this.size.set(width, height);

        SetTexture('__WHITE', null, this);

        // this.texture = TextureManagerInstance.get().get('__WHITE');
        // this.frame = this.texture.getFrame();

        this.color = color;
    }

    setColor (color: number): this
    {
        this.color = color;

        return this;
    }

    isRenderable (): boolean
    {
        return (this.visible && WillRender(this.id) && this.alpha > 0);
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

    get color (): number
    {
        return ColorComponent.tint[this.id];
    }

    set color (value: number)
    {
        SetTint(this.id, value);
    }

    destroy (reparentChildren?: IGameObject): void
    {
        super.destroy(reparentChildren);

        this.texture = null;
        this.frame = null;
    }
}
