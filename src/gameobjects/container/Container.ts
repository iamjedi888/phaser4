import { AddTransform2DComponent, Origin, Position, Scale, Size, Skew, Transform2DComponent } from '../../components/transform/';
import { GetDefaultOriginX, GetDefaultOriginY } from '../../config/defaultorigin';

import { GameObject } from '../GameObject';
import { IContainer } from './IContainer';
import { IGameObject } from '../IGameObject';
import { Rectangle } from '../../geom/rectangle/Rectangle';
import { SetDirtyAlpha } from '../../components/dirty/';

export class Container extends GameObject implements IContainer
{
    protected _alpha: number = 1;

    position: Position;
    scale: Scale;
    skew: Skew;
    origin: Origin;
    size: Size;

    constructor (x: number = 0, y: number = 0)
    {
        super();

        const id = this.id;

        AddTransform2DComponent(id, x, y, GetDefaultOriginX(), GetDefaultOriginY());

        this.position = new Position(id, x, y);
        this.scale = new Scale(id);
        this.skew = new Skew(id);
        this.size = new Size(id);
        this.origin = new Origin(id, GetDefaultOriginX(), GetDefaultOriginY());
    }

    getBounds (): Rectangle
    {
        // return this.bounds.get();
        return new Rectangle();
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
        return this._alpha;
    }

    set alpha (value: number)
    {
        this._alpha = value;

        SetDirtyAlpha(this.id);
    }

    destroy (reparentChildren?: IGameObject): void
    {
        super.destroy(reparentChildren);
    }
}
