import { Extent2DComponent } from './Extent2DComponent';
import { IVec2 } from '../../math/vec2/IVec2';
import { UpdateExtent } from './UpdateExtent';

export class Size implements IVec2
{
    private id: number;

    constructor (id: number, width: number = 0, height: number = 0)
    {
        this.id = id;

        this.set(width, height);
    }

    set (width: number, height: number = width): this
    {
        this.width = width;
        this.height = height;

        return this;
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
        this.width = value;
    }

    get x (): number
    {
        return this.width;
    }

    set y (value: number)
    {
        this.height = value;
    }

    get y (): number
    {
        return this.height;
    }
}
