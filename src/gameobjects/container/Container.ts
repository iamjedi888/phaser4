import { AddTransform2DComponent, Extent2DComponent, Transform2DComponent, UpdateExtent } from '../../components/transform/';
import { GetDefaultOriginX, GetDefaultOriginY } from '../../config/defaultorigin';

import { GameObject } from '../GameObject';
import { IContainer } from './IContainer';
import { IGameObject } from '../IGameObject';
import { Rectangle } from '../../geom/rectangle/Rectangle';
import { SetDirtyAlpha } from '../../components/dirty/';
import { Vec2 } from '../../math/vec2/Vec2';

export class Container extends GameObject implements IContainer
{
    protected _alpha: number = 1;

    constructor (x: number = 0, y: number = 0)
    {
        super();

        AddTransform2DComponent(this.id, x, y, GetDefaultOriginX(), GetDefaultOriginY());
    }

    /*
    updateTransform (flag: number, value: number): void
    {
        if (this.transformData[flag] !== value)
        {
            this.transformData[flag] = value;

            this.updateLocalTransform();
            this.updateWorldTransform();
        }
    }

    updateLocalTransform (): void
    {
        this.setDirty(DIRTY_CONST.TRANSFORM, DIRTY_CONST.BOUNDS);

        UpdateLocalTransform(this.localTransform, this.transformData);
    }

    updateTransform (): void
    {
        this.setDirty(DIRTY_CONST.TRANSFORM, DIRTY_CONST.BOUNDS);

        //  To take advantage of Changed batching we didn't ought to do this here, but on render
        UpdateTransform2DSystem(GameObjectWorld);

        const id = this.id;

        this.localTransform.set(
            Matrix2DComponent.a[id],
            Matrix2DComponent.b[id],
            Matrix2DComponent.c[id],
            Matrix2DComponent.d[id],
            Matrix2DComponent.tx[id],
            Matrix2DComponent.ty[id]
            );

            this.updateWorldTransform();
        }
    */

    updateWorldTransform (): void
    {
        /*
        this.setDirty(DIRTY_CONST.TRANSFORM, DIRTY_CONST.BOUNDS);

        const parentWorldTransform = (this.parent) ? this.parent.worldTransform : undefined;

        UpdateWorldTransform(this.localTransform, this.worldTransform, this.passthru, parentWorldTransform);

        if (this.numChildren)
        {
            //  Sweep all children - by this point our local and world transforms are correct
            const children = this.children;

            for (let i = 0; i < children.length; i++)
            {
                const child = children[i];

                child.updateWorldTransform();
            }
        }
        */
    }

    getBounds (): Rectangle
    {
        return this.bounds.get();
    }

    setSize (width: number, height: number = width): this
    {
        UpdateExtent(this.id, width, height);

        return this;
    }

    setPosition (x: number, y: number): this
    {
        this.x = x;
        this.y = y;

        return this;
    }

    setSkew (x: number, y: number = x): this
    {
        this.skewX = x;
        this.skewY = y;

        return this;
    }

    setScale (x: number, y: number = x): this
    {
        this.scaleX = x;
        this.scaleY = y;

        return this;
    }

    setRotation (value: number): this
    {
        this.rotation = value;

        return this;
    }

    setOrigin (x: number, y: number = x): this
    {
        const id = this.id;

        Transform2DComponent.originX[id] = x;
        Transform2DComponent.originY[id] = y;

        UpdateExtent(id, this.width, this.height);

        return this;
    }

    getSize (out: Vec2 = new Vec2()): Vec2
    {
        return out.set(Extent2DComponent.width[this.id], Extent2DComponent.height[this.id]);
    }

    getPosition (out: Vec2 = new Vec2()): Vec2
    {
        return out.set(this.x, this.y);
    }

    getOrigin (out: Vec2 = new Vec2()): Vec2
    {
        return out.set(this.originX, this.originY);
    }

    getSkew (out: Vec2 = new Vec2()): Vec2
    {
        return out.set(this.skewX, this.skewY);
    }

    getScale (out: Vec2 = new Vec2()): Vec2
    {
        return out.set(this.scaleX, this.scaleY);
    }

    getRotation (): number
    {
        return this.rotation;
    }

    set width (value: number)
    {
        UpdateExtent(this.id, value, this.height);
    }

    get width (): number
    {
        return Extent2DComponent.width[this.id];
    }

    set height (value: number)
    {
        UpdateExtent(this.id, this.width, value);
    }

    get height (): number
    {
        return Extent2DComponent.height[this.id];
    }

    set x (value: number)
    {
        Transform2DComponent.x[this.id] = value;
    }

    get x (): number
    {
        return Transform2DComponent.x[this.id];
    }

    set y (value: number)
    {
        Transform2DComponent.y[this.id] = value;
    }

    get y (): number
    {
        return Transform2DComponent.y[this.id];
    }

    set originX (value: number)
    {
        Transform2DComponent.originX[this.id] = value;

        UpdateExtent(this.id, this.width, this.height);
    }

    get originX (): number
    {
        return Transform2DComponent.originX[this.id];
    }

    set originY (value: number)
    {
        Transform2DComponent.originY[this.id] = value;

        UpdateExtent(this.id, this.width, this.height);
    }

    get originY (): number
    {
        return Transform2DComponent.originY[this.id];
    }

    set skewX (value: number)
    {
        Transform2DComponent.skewX[this.id] = value;
    }

    get skewX (): number
    {
        return Transform2DComponent.skewX[this.id];
    }

    set skewY (value: number)
    {
        Transform2DComponent.skewY[this.id] = value;
    }

    get skewY (): number
    {
        return Transform2DComponent.skewY[this.id];
    }

    set scaleX (value: number)
    {
        Transform2DComponent.scaleX[this.id] = value;
    }

    get scaleX (): number
    {
        return Transform2DComponent.scaleX[this.id];
    }

    set scaleY (value: number)
    {
        Transform2DComponent.scaleY[this.id] = value;
    }

    get scaleY (): number
    {
        return Transform2DComponent.scaleY[this.id];
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

        /*
        if (value !== this._alpha)
        {
            this._alpha = value;

            this.vertices.forEach(vertex =>
            {
                vertex.setAlpha(value);
            });

            this.setDirty(DIRTY_CONST.COLORS);
        }
        */
    }

    destroy (reparentChildren?: IGameObject): void
    {
        super.destroy(reparentChildren);

        //  TODO - Clear components

        // this.bounds.destroy();
        // this.input.destroy();
    }
}
