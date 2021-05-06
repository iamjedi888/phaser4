import { DIRTY_CONST } from '../DIRTY_CONST';
import { GameObject } from '../GameObject';
import { GetRectangleSize } from '../../geom/rectangle/GetRectangleSize';
import { IContainer } from './IContainer';
import { Vec2 } from '../../math/vec2/Vec2';

export class Container extends GameObject implements IContainer
{
    protected _alpha: number = 1;

    constructor (x: number = 0, y: number = 0)
    {
        super(x, y);

        this.type = 'Container';
    }

    setSize (width: number, height: number = width): this
    {
        this.transform.updateExtent(width, height);

        return this;
    }

    getSize (out: Vec2 = new Vec2()): Vec2
    {
        return GetRectangleSize(this.transform.extent, out);
    }

    setPosition (x: number, y: number): this
    {
        this.transform.position.set(x, y);

        return this;
    }

    getPosition (out: Vec2 = new Vec2()): Vec2
    {
        const position = this.transform.position;

        return out.set(position.x, position.y);
    }

    setOrigin (x: number, y: number = x): this
    {
        this.transform.origin.set(x, y);

        return this;
    }

    getOrigin (out: Vec2 = new Vec2()): Vec2
    {
        const origin = this.transform.origin;

        return out.set(origin.x, origin.y);
    }

    setSkew (x: number, y: number = x): this
    {
        this.transform.skew.set(x, y);

        return this;
    }

    getSkew (out: Vec2 = new Vec2()): Vec2
    {
        const skew = this.transform.skew;

        return out.set(skew.x, skew.y);
    }

    setScale (x: number, y: number = x): this
    {
        this.transform.scale.set(x, y);

        return this;
    }

    getScale (out: Vec2 = new Vec2()): Vec2
    {
        const scale = this.transform.scale;

        return out.set(scale.x, scale.y);
    }

    setRotation (value: number): this
    {
        this.transform.rotation = value;

        return this;
    }

    getRotation (): number
    {
        return this.transform.rotation;
    }

    set width (value: number)
    {
        this.transform.updateExtent(value);
    }

    get width (): number
    {
        return this.transform.extent.width;
    }

    set height (value: number)
    {
        this.transform.updateExtent(undefined, value);
    }

    get height (): number
    {
        return this.transform.extent.height;
    }

    set x (value: number)
    {
        this.transform.position.x = value;
    }

    get x (): number
    {
        return this.transform.position.x;
    }

    set y (value: number)
    {
        this.transform.position.y = value;
    }

    get y (): number
    {
        return this.transform.position.y;
    }

    set originX (value: number)
    {
        this.transform.origin.x = value;
    }

    get originX (): number
    {
        return this.transform.origin.x;
    }

    set originY (value: number)
    {
        this.transform.origin.y = value;
    }

    get originY (): number
    {
        return this.transform.origin.y;
    }

    set skewX (value: number)
    {
        this.transform.skew.x = value;
    }

    get skewX (): number
    {
        return this.transform.skew.x;
    }

    set skewY (value: number)
    {
        this.transform.skew.y = value;
    }

    get skewY (): number
    {
        return this.transform.skew.y;
    }

    set scaleX (value: number)
    {
        this.transform.scale.x = value;
    }

    get scaleX (): number
    {
        return this.transform.scale.x;
    }

    set scaleY (value: number)
    {
        this.transform.scale.y = value;
    }

    get scaleY (): number
    {
        return this.transform.scale.y;
    }

    set rotation (value: number)
    {
        this.transform.rotation = value;
    }

    get rotation (): number
    {
        return this.transform.rotation;
    }

    get alpha (): number
    {
        return this._alpha;
    }

    set alpha (value: number)
    {
        if (value !== this._alpha)
        {
            this._alpha = value;

            this.vertices.forEach(vertex =>
            {
                vertex.setAlpha(value);
            });

            this.setDirty(DIRTY_CONST.COLORS);
        }
    }
}
