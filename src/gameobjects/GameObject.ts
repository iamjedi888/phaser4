import { GetDefaultOriginX, GetDefaultOriginY } from '../config/defaultorigin';
import { UpdateLocalTransform, UpdateWorldTransform } from '../components/transform';
import { addComponent, addEntity } from 'bitecs';

import { BoundsComponent } from '../components/bounds/BoundsComponent';
import { DIRTY_CONST } from './DIRTY_CONST';
import { DestroyChildren } from '../display/DestroyChildren';
import { DestroyEvent } from './events/DestroyEvent';
import { Emit } from '../events/Emit';
import { GameInstance } from '../GameInstance';
import { GetRectangleSize } from '../geom/rectangle/GetRectangleSize';
import { IBaseWorld } from '../world/IBaseWorld';
import { IBoundsComponent } from '../components/bounds/IBoundsComponent';
import { ICanvasRenderer } from '../renderer/canvas/ICanvasRenderer';
import { IEventInstance } from '../events/IEventInstance';
import { IGameObject } from './IGameObject';
import { IInputComponent } from '../components/input/IInputComponent';
import { IRenderPass } from '../renderer/webgl1/renderpass/IRenderPass';
import { InputComponent } from '../components/input/InputComponent';
import { Matrix2D } from '../math/mat2d/Matrix2D';
import { Matrix2DComponent } from '../components/Matrix2DComponent';
import { Rectangle } from '../geom/rectangle/Rectangle';
import { ReparentChildren } from '../display/ReparentChildren';
import { TRANSFORM_CONST } from '../components/transform/TRANSFORM_CONST';
import { Transform2DComponent } from '../components/Transform2DComponent';
import { UpdateTransform2DSystem } from '../components/UpdateTransform2DSystem';
import { Vec2 } from '../math/vec2/Vec2';
import { Vertex } from '../components/Vertex';
import { World } from '../components/World';

export class GameObject implements IGameObject
{
    name: string = '';

    //  The World this Game Object belongs to. A Game Object can only belong to one World instance at any one time.
    world: IBaseWorld;

    //  The direct parent of this Game Object in the scene graph (if any)
    parent: IGameObject;

    children: IGameObject[];

    events: Map<string, Set<IEventInstance>>;

    willUpdate: boolean = true;
    willUpdateChildren: boolean = true;

    willRender: boolean = true;
    willRenderChildren: boolean = true;
    willCacheChildren: boolean = false;

    dirty: number = 0;
    dirtyFrame: number = 0;

    localTransform: Matrix2D;
    worldTransform: Matrix2D;
    transformData: Float32Array;
    transformExtent: Rectangle;

    id: number;

    bounds: IBoundsComponent;
    input: IInputComponent;

    vertices: Vertex[];

    visible: boolean = true;

    constructor (x: number = 0, y: number = 0)
    {
        this.children = [];
        this.vertices = [];

        this.events = new Map();

        this.localTransform = new Matrix2D();
        this.worldTransform = new Matrix2D();

        //  See TRANSFORM_CONST for array layout
        this.transformData = new Float32Array([ x, y, 0, 1, 1, 0, 0, GetDefaultOriginX(), GetDefaultOriginY(), 0 ]);
        this.transformExtent = new Rectangle();

        this.bounds = new BoundsComponent(this);
        this.input = new InputComponent(this);

        this.dirty = DIRTY_CONST.DEFAULT;

        const id = addEntity(World);

        addComponent(World, Transform2DComponent, id);
        addComponent(World, Matrix2DComponent, id);

        Transform2DComponent.x[id] = x;
        Transform2DComponent.y[id] = y;
        Transform2DComponent.rotation[id] = 0;
        Transform2DComponent.scaleX[id] = 1;
        Transform2DComponent.scaleY[id] = 1;
        Transform2DComponent.skewX[id] = 0;
        Transform2DComponent.skewY[id] = 0;

        this.id = id;

        this.updateTransform();

        // this.updateLocalTransform();
        // this.updateWorldTransform();
    }

    isRenderable (): boolean
    {
        return (this.visible && this.willRender);
    }

    isDirty (flag: number): boolean
    {
        return (this.dirty & flag) !== 0;
    }

    clearDirty (flag: number): this
    {
        if (this.isDirty(flag))
        {
            this.dirty ^= flag;
        }

        return this;
    }

    setDirty (flag: number, flag2?: number): this
    {
        if (!this.isDirty(flag))
        {
            this.dirty ^= flag;
            this.dirtyFrame = GameInstance.getFrame();
        }

        if (!this.isDirty(flag2))
        {
            this.dirty ^= flag2;
        }

        return this;
    }

    update (delta: number, time: number): void
    {
        if (this.willUpdateChildren)
        {
            const children = this.children;

            for (let i = 0; i < children.length; i++)
            {
                const child = children[i];

                if (child && child.willUpdate)
                {
                    child.update(delta, time);
                }
            }
        }

        this.postUpdate(delta, time);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    postUpdate (delta: number, time: number): void
    {
        //  Empty for parent classes to use.
        //  Called after this GameObject and all of its children have been updated.
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    renderGL <T extends IRenderPass> (renderPass: T): void
    {
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    renderCanvas <T extends ICanvasRenderer> (renderer: T): void
    {
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    postRenderGL <T extends IRenderPass> (renderPass: T): void
    {
        //  Called after this GameObject and all of its children have been rendered.
        //  If it doesn't have any children, this method is never called.
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    postRenderCanvas <T extends ICanvasRenderer> (renderer: T): void
    {
        //  Called after this GameObject and all of its children have been rendered.
        //  If it doesn't have any children, this method is never called.
    }

    get numChildren (): number
    {
        return this.children.length;
    }

    getBounds (): Rectangle
    {
        return this.bounds.get();
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
        UpdateTransform2DSystem(World);

        const id = this.id;

        this.localTransform.set(
            Matrix2DComponent.a[id],
            Matrix2DComponent.b[id],
            Matrix2DComponent.c[id],
            Matrix2DComponent.d[id],
            Matrix2DComponent.tx[id],
            Matrix2DComponent.ty[id]
        );

        // this.localTransform.set(
        //     Math.cos(rotation + skewY) * scaleX,
        //     Math.sin(rotation + skewY) * scaleX,
        //     -Math.sin(rotation - skewX) * scaleY,
        //     Math.cos(rotation - skewX) * scaleY,
        //     x,
        //     y
        // );

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
        const transformData = this.transformData;

        transformData[TRANSFORM_CONST.ORIGIN_X] = x;
        transformData[TRANSFORM_CONST.ORIGIN_Y] = y;

        this.updateExtent();

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
        const transformData = this.transformData;

        if (value !== transformData[TRANSFORM_CONST.ORIGIN_X])
        {
            transformData[TRANSFORM_CONST.ORIGIN_X] = value;

            this.updateExtent();
        }
    }

    get originX (): number
    {
        return this.transformData[TRANSFORM_CONST.ORIGIN_X];
    }

    set originY (value: number)
    {
        const transformData = this.transformData;

        if (value !== transformData[TRANSFORM_CONST.ORIGIN_Y])
        {
            transformData[TRANSFORM_CONST.ORIGIN_Y] = value;

            this.updateExtent();
        }
    }

    get originY (): number
    {
        return this.transformData[TRANSFORM_CONST.ORIGIN_Y];
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

    set passthru (value: boolean)
    {
        // this.updateTransform(TRANSFORM_CONST.PASSTHRU, Number(value));
    }

    get passthru (): boolean
    {
        return Boolean(this.transformData[TRANSFORM_CONST.PASSTHRU]);
    }

    destroy (reparentChildren?: IGameObject): void
    {
        if (reparentChildren)
        {
            ReparentChildren(this, reparentChildren);
        }
        else
        {
            DestroyChildren(this);
        }

        Emit(this, DestroyEvent, this);

        this.bounds.destroy();
        this.input.destroy();

        this.events.clear();

        this.world = null;
        this.parent = null;
        this.children = null;

        this.vertices = [];
    }
}
