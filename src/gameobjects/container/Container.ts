import { AddBoundsComponent } from '../../components/bounds/AddBoundsComponent';
import { AddTransform2DComponent } from '../../components/transform/AddTransform2DComponent';
import { Color } from '../../components/color/Color';
import { Flush } from '../../renderer/webgl1/renderpass/Flush';
import { GameObject } from '../GameObject';
import { GetDefaultOriginX } from '../../config/defaultorigin/GetDefaultOriginX';
import { GetDefaultOriginY } from '../../config/defaultorigin/GetDefaultOriginY';
import { IContainer } from './IContainer';
import { IGameObject } from '../IGameObject';
import { IRenderPass } from '../../renderer/webgl1/renderpass/IRenderPass';
import { IShader } from '../../renderer/webgl1/shaders/IShader';
import { Origin } from '../../components/transform/Origin';
import { PopColor } from '../../renderer/webgl1/renderpass/PopColor';
import { Position } from '../../components/transform/Position';
import { Scale } from '../../components/transform/Scale';
import { SetColor } from '../../renderer/webgl1/renderpass/SetColor';
import { Size } from '../../components/transform/Size';
import { Skew } from '../../components/transform/Skew';
import { Transform2DComponent } from '../../components/transform/Transform2DComponent';

export class Container extends GameObject implements IContainer
{
    readonly type: string = 'Container';

    position: Position;
    scale: Scale;
    skew: Skew;
    origin: Origin;
    size: Size;
    color: Color;

    shader: IShader;

    constructor (x: number = 0, y: number = 0)
    {
        super();

        const id = this.id;

        AddTransform2DComponent(id, x, y, GetDefaultOriginX(), GetDefaultOriginY());
        AddBoundsComponent(id);

        this.position = new Position(id, x, y);
        this.scale = new Scale(id);
        this.skew = new Skew(id);
        this.size = new Size(id);
        this.origin = new Origin(id, GetDefaultOriginX(), GetDefaultOriginY());
        this.color = new Color(id);
    }

    renderGL <T extends IRenderPass> (renderPass: T): void
    {
        if (this.shader)
        {
            Flush(renderPass);

            renderPass.shader.set(this.shader, 0);
        }

        SetColor(renderPass, this.color);

        this.preRenderGL(renderPass);
    }

    postRenderGL <T extends IRenderPass> (renderPass: T): void
    {
        if (this.shader)
        {
            Flush(renderPass);

            renderPass.shader.pop();
        }

        PopColor(renderPass, this.color);
    }

    set x (value: number)
    {
        this.position.x = value;
    }

    get x (): number
    {
        return this.position.x;
    }

    set y (value: number)
    {
        this.position.y = value;
    }

    get y (): number
    {
        return this.position.y;
    }

    set rotation (value: number)
    {
        Transform2DComponent.rotation[this.id] = value;
    }

    get rotation (): number
    {
        return Transform2DComponent.rotation[this.id];
    }

    get alpha (): number
    {
        return this.color.alpha;
    }

    set alpha (value: number)
    {
        this.color.alpha = value;
    }

    setAlpha (value: number): this
    {
        this.alpha = value;

        return this;
    }

    setPosition (x: number, y?: number): this
    {
        this.position.set(x, y);

        return this;
    }

    setScale (x: number, y?: number): this
    {
        this.scale.set(x, y);

        return this;
    }

    setRotation (value: number): this
    {
        this.rotation = value;

        return this;
    }

    setSkew (x: number, y?: number): this
    {
        this.skew.set(x, y);

        return this;
    }

    setOrigin (x: number, y?: number): this
    {
        this.origin.set(x, y);

        return this;
    }

    destroy (reparentChildren?: IGameObject): void
    {
        super.destroy(reparentChildren);
    }
}
