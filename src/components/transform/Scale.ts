import { IVec2 } from '../../math/vec2/IVec2';
import { SetDirtyTransform } from '../dirty';
import { Transform2DComponent } from './Transform2DComponent';

export class Scale implements IVec2
{
    private id: number;

    constructor (id: number, x: number = 1, y: number = 1)
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
        // Transform2DComponent.scaleX[this.id] = value;
        Transform2DComponent.data[this.id][3] = value;
        SetDirtyTransform(this.id);
    }

    get x (): number
    {
        // return Transform2DComponent.scaleX[this.id];
        return Transform2DComponent.data[this.id][3];
    }

    set y (value: number)
    {
        // Transform2DComponent.scaleY[this.id] = value;
        Transform2DComponent.data[this.id][4] = value;
        SetDirtyTransform(this.id);
    }

    get y (): number
    {
        // return Transform2DComponent.scaleY[this.id];
        return Transform2DComponent.data[this.id][4];
    }
}
