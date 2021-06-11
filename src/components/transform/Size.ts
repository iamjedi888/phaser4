import { Extent2DComponent } from './Extent2DComponent';
import { UpdateExtent } from './UpdateExtent';

export class Size
{
    private id: number;

    constructor (id: number, width: number = 0, height: number = 0)
    {
        this.id = id;

        this.width = width;
        this.height = height;
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
}
