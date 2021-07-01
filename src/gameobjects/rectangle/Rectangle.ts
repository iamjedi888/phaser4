import { AddQuadVertex } from '../../components/vertices';
import { BatchTexturedQuad } from '../../renderer/webgl1/draw/BatchTexturedQuad';
import { ColorComponent } from '../../components/color/ColorComponent';
import { Container } from '../container/Container';
import { Frame } from '../../textures/Frame';
import { GetTexture } from '../../textures/GetTexture';
import { ICanvasRenderer } from '../../renderer/canvas/ICanvasRenderer';
import { IGameObject } from '../IGameObject';
import { IRectangle } from './IRectangle';
import { IRenderPass } from '../../renderer/webgl1/renderpass/IRenderPass';
import { PreRenderVertices } from '../../components/transform/PreRenderVertices';
import { SetTint } from '../../components/color/SetTint';
import { Texture } from '../../textures/Texture';
import { WillRender } from '../../components/permissions/WillRender';

export class Rectangle extends Container implements IRectangle
{
    readonly type: string = 'Rectangle';

    private texture: Texture;
    private frame: Frame;

    constructor (x: number, y: number, width: number = 64, height: number = 64, color: number = 0xffffff)
    {
        super(x, y);

        const id = this.id;

        AddQuadVertex(id);

        this.texture = GetTexture('__WHITE');

        this.frame = this.texture.getFrame();

        this.frame.copyToExtent(this);
        this.frame.copyToVertices(id);

        this.size.set(width, height);

        this.tint = color;
    }

    setColor (color: number): this
    {
        this.tint = color;

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

    destroy (reparentChildren?: IGameObject): void
    {
        super.destroy(reparentChildren);

        this.texture = null;
        this.frame = null;
    }
}
