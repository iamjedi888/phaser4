import { GetDefaultOriginX, GetDefaultOriginY } from '../../../config/defaultorigin/';
import { Vec2, Vec2Callback } from '../../../math/vec2';

import { DIRTY_CONST } from '../../DIRTY_CONST';
import { IGameObject } from '../../IGameObject';
import { ITransformComponent } from './ITransformComponent';
import { Matrix2D } from '../../../math/mat2d/Matrix2D';
import { Rectangle } from '../../../geom/rectangle';
import { UpdateLocalTransform } from './UpdateLocalTransform';
import { UpdateWorldTransform } from './UpdateWorldTransform';

export class TransformComponent implements ITransformComponent
{
    entity: IGameObject;

    //  This should be treated as read-only, it is always perfectly in sync with the properties in this class
    local: Matrix2D;

    world: Matrix2D;

    position: Vec2Callback;
    scale: Vec2Callback;
    skew: Vec2Callback;
    origin: Vec2Callback;
    extent: Rectangle;

    passthru: boolean = false;

    private _rotation: number = 0;

    constructor (entity: IGameObject, x: number = 0, y: number = 0)
    {
        this.entity = entity;

        this.local = new Matrix2D();
        this.world = new Matrix2D();

        const update = () => this.update();
        const updateExtent = () => this.updateExtent();

        this.position = new Vec2Callback(update, x, y);
        this.scale = new Vec2Callback(update, 1, 1);
        this.skew = new Vec2Callback(update);
        this.origin = new Vec2Callback(updateExtent, GetDefaultOriginX(), GetDefaultOriginY());

        this.extent = new Rectangle();
    }

    update (): void
    {
        this.updateLocal();
        this.updateWorld();
    }

    updateLocal (): void
    {
        this.entity.setDirty(DIRTY_CONST.TRANSFORM, DIRTY_CONST.BOUNDS);

        UpdateLocalTransform(this);
    }

    updateWorld (): void
    {
        const entity = this.entity;

        entity.setDirty(DIRTY_CONST.TRANSFORM, DIRTY_CONST.BOUNDS);

        UpdateWorldTransform(entity);

        if (entity.numChildren)
        {
            this.updateChildren();
        }
    }

    updateChildren (): void
    {
        //  Sweep all children - by this point our local and world transforms are correct
        const children = this.entity.children;

        for (let i = 0; i < children.length; i++)
        {
            const child = children[i];

            child.transform.updateWorld();
        }
    }

    globalToLocal (x: number, y: number, out: Vec2 = new Vec2()): Vec2
    {
        const { a, b, c, d, tx, ty } = this.world;

        const id: number = 1 / ((a * d) + (c * -b));

        out.x = (d * id * x) + (-c * id * y) + (((ty * c) - (tx * d)) * id);
        out.y = (a * id * y) + (-b * id * x) + (((-ty * a) + (tx * b)) * id);

        return out;
    }

    localToGlobal (x: number, y: number, out: Vec2 = new Vec2()): Vec2
    {
        const { a, b, c, d, tx, ty } = this.world;

        out.x = (a * x) + (c * y) + tx;
        out.y = (b * x) + (d * y) + ty;

        return out;
    }

    //  The area covered by this transform component + origin + size (usually from a Frame)
    setExtent (x: number, y: number, width: number, height: number): void
    {
        this.extent.set(x, y, width, height);

        this.entity.setDirty(DIRTY_CONST.TRANSFORM, DIRTY_CONST.BOUNDS);
    }

    updateExtent (width?: number, height?: number): void
    {
        const extent = this.extent;
        const entity = this.entity;

        if (width !== undefined)
        {
            extent.width = width;
        }

        if (height !== undefined)
        {
            extent.height = height;
        }

        extent.x = -(this.origin.x) * extent.width;
        extent.y = -(this.origin.y) * extent.height;

        entity.setDirty(DIRTY_CONST.TRANSFORM, DIRTY_CONST.BOUNDS);
    }

    set rotation (value: number)
    {
        if (value !== this._rotation)
        {
            this._rotation = value;

            this.update();
        }
    }

    get rotation (): number
    {
        return this._rotation;
    }

    destroy (): void
    {
        this.position.destroy();
        this.scale.destroy();
        this.skew.destroy();
        this.origin.destroy();

        this.entity = null;
        this.local = null;
        this.world = null;
        this.position = null;
        this.scale = null;
        this.skew = null;
        this.origin = null;
        this.extent = null;
    }
}
