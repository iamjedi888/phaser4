import { Extent2DComponent } from './Extent2DComponent';
import { IVec2 } from '../../math/vec2/IVec2';
import { Transform2DComponent } from './Transform2DComponent';
import { UpdateExtent } from './UpdateExtent';

export class Origin implements IVec2
{
    private id: number;

    constructor (id: number, x: number = 0, y: number = 0)
    {
        this.id = id;

        this.x = x;
        this.y = y;
    }

    set (x: number, y: number = x): this
    {
        const id = this.id;

        Transform2DComponent.originX[id] = x;
        Transform2DComponent.originY[id] = y;

        UpdateExtent(id, Extent2DComponent.width[id], Extent2DComponent.height[id]);

        return this;
    }

    set x (value: number)
    {
        const id = this.id;

        Transform2DComponent.originX[id] = value;

        UpdateExtent(id, Extent2DComponent.width[id], Extent2DComponent.height[id]);
    }

    get x (): number
    {
        return Transform2DComponent.originX[this.id];
    }

    set y (value: number)
    {
        const id = this.id;

        Transform2DComponent.originY[id] = value;

        UpdateExtent(id, Extent2DComponent.width[id], Extent2DComponent.height[id]);
    }

    get y (): number
    {
        return Transform2DComponent.originY[this.id];
    }
}
