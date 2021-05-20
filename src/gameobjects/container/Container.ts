import { GetDefaultOriginX, GetDefaultOriginY } from '../../config/defaultorigin';
import { UpdateLocalTransform, UpdateWorldTransform } from '../../components/transform';

import { AddTransform2DComponent } from '../../components/AddTransform2DComponent';
import { DIRTY_CONST } from '../DIRTY_CONST';
import { GameObject } from '../GameObject';
import { GameObjectWorld } from '../../components/GameObjectWorld';
import { GetRectangleSize } from '../../geom/rectangle/GetRectangleSize';
import { IContainer } from './IContainer';
import { IGameObject } from '../IGameObject';
import { Matrix2D } from '../../math/mat2d/Matrix2D';
import { Matrix2DComponent } from '../../components/Matrix2DComponent';
import { Rectangle } from '../../geom/rectangle/Rectangle';
import { Transform2DComponent } from '../../components/Transform2DComponent';
import { UpdateTransform2DSystem } from '../../components/UpdateTransform2DSystem';
import { Vec2 } from '../../math/vec2/Vec2';
import { addComponent } from 'bitecs';

export class Container extends GameObject implements IContainer
{
    protected _alpha: number = 1;

    localTransform: Matrix2D;
    worldTransform: Matrix2D;
    transformExtent: Rectangle;

    // bounds: IBoundsComponent;
    // input: IInputComponent;

    constructor (x: number = 0, y: number = 0)
    {
        super();

        // this.bounds = new BoundsComponent(this);
        // this.input = new InputComponent(this);

        this.localTransform = new Matrix2D();
        this.worldTransform = new Matrix2D();

        this.transformExtent = new Rectangle();

        addComponent(GameObjectWorld, Matrix2DComponent, this.id);

        AddTransform2DComponent(this.id, x, y, GetDefaultOriginX(), GetDefaultOriginY());

        this.updateTransform();

        // this.updateLocalTransform();
        // this.updateWorldTransform();
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
    */

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

    updateWorldTransform (): void
    {
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
    }

    //  The area covered by this transform component + origin + size (usually from a Frame)
    setExtent (x: number, y: number, width: number, height: number): void
    {
        this.transformExtent.set(x, y, width, height);

        this.setDirty(DIRTY_CONST.TRANSFORM, DIRTY_CONST.BOUNDS);
    }

    updateExtent (width?: number, height?: number): void
    {
        const extent = this.transformExtent;

        if (width !== undefined)
        {
            extent.width = width;
        }

        if (height !== undefined)
        {
            extent.height = height;
        }

        extent.x = -(this.originX) * extent.width;
        extent.y = -(this.originY) * extent.height;

        this.setDirty(DIRTY_CONST.TRANSFORM, DIRTY_CONST.BOUNDS);
    }

    getBounds (): Rectangle
    {
        return this.bounds.get();
    }

    setSize (width: number, height: number = width): this
    {
        this.updateExtent(width, height);

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
        this.originX = x;
        this.originY = y;

        return this;
    }

    getSize (out: Vec2 = new Vec2()): Vec2
    {
        return GetRectangleSize(this.transformExtent, out);
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
        this.updateExtent(value);
    }

    get width (): number
    {
        return this.transformExtent.width;
    }

    set height (value: number)
    {
        this.updateExtent(undefined, value);
    }

    get height (): number
    {
        return this.transformExtent.height;
    }

    set x (value: number)
    {
        Transform2DComponent.x[this.id] = value;

        this.updateTransform();
    }

    get x (): number
    {
        return Transform2DComponent.x[this.id];
    }

    set y (value: number)
    {
        Transform2DComponent.y[this.id] = value;

        this.updateTransform();
    }

    get y (): number
    {
        return Transform2DComponent.y[this.id];
    }

    set originX (value: number)
    {
        Transform2DComponent.originX[this.id] = value;

        this.updateExtent();
    }

    get originX (): number
    {
        return Transform2DComponent.originX[this.id];
    }

    set originY (value: number)
    {
        Transform2DComponent.originY[this.id] = value;

        this.updateExtent();
    }

    get originY (): number
    {
        return Transform2DComponent.originY[this.id];
    }

    set skewX (value: number)
    {
        Transform2DComponent.skewX[this.id] = value;

        this.updateTransform();
    }

    get skewX (): number
    {
        return Transform2DComponent.skewX[this.id];
    }

    set skewY (value: number)
    {
        Transform2DComponent.skewY[this.id] = value;

        this.updateTransform();
    }

    get skewY (): number
    {
        return Transform2DComponent.skewY[this.id];
    }

    set scaleX (value: number)
    {
        Transform2DComponent.scaleX[this.id] = value;

        this.updateTransform();
    }

    get scaleX (): number
    {
        return Transform2DComponent.scaleX[this.id];
    }

    set scaleY (value: number)
    {
        Transform2DComponent.scaleY[this.id] = value;

        this.updateTransform();
    }

    get scaleY (): number
    {
        return Transform2DComponent.scaleY[this.id];
    }

    set rotation (value: number)
    {
        Transform2DComponent.rotation[this.id] = value;

        this.updateTransform();
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

    destroy (reparentChildren?: IGameObject): void
    {
        super.destroy(reparentChildren);

        //  TODO - Clear components

        // this.bounds.destroy();
        // this.input.destroy();
    }
}
