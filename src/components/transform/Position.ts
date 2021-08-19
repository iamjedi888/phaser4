import { IVec2 } from '../../math/vec2/IVec2';
import { SetDirtyTransform } from '../dirty';
import { Transform2DComponent } from './Transform2DComponent';

export class Position implements IVec2
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
        this.x = x;
        this.y = y;

        return this;
    }

    set x (value: number)
    {
        // Transform2DComponent.x[this.id] = value;
        Transform2DComponent.data[this.id][0] = value;
        SetDirtyTransform(this.id);
    }

    get x (): number
    {
        // return Transform2DComponent.x[this.id];
        return Transform2DComponent.data[this.id][0];
    }

    set y (value: number)
    {
        // Transform2DComponent.y[this.id] = value;
        Transform2DComponent.data[this.id][1] = value;
        SetDirtyTransform(this.id);
    }

    get y (): number
    {
        // return Transform2DComponent.y[this.id];
        return Transform2DComponent.data[this.id][1];
    }
}
