import { TRANSFORM, Transform2DComponent } from './Transform2DComponent';

import { IVec2 } from '../../math/vec2/IVec2';
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

        Transform2DComponent.data[id][TRANSFORM.ORIGIN_X] = x;
        Transform2DComponent.data[id][TRANSFORM.ORIGIN_Y] = y;

        UpdateExtent(id, Transform2DComponent.data[id][TRANSFORM.FRAME_WIDTH], Transform2DComponent.data[id][TRANSFORM.FRAME_HEIGHT]);

        return this;
    }

    set x (value: number)
    {
        const id = this.id;

        Transform2DComponent.data[id][TRANSFORM.ORIGIN_X] = value;

        UpdateExtent(id, Transform2DComponent.data[id][TRANSFORM.FRAME_WIDTH], Transform2DComponent.data[id][TRANSFORM.FRAME_HEIGHT]);
    }

    get x (): number
    {
        return Transform2DComponent.data[this.id][TRANSFORM.ORIGIN_X];
    }

    set y (value: number)
    {
        const id = this.id;

        Transform2DComponent.data[id][TRANSFORM.ORIGIN_Y] = value;

        UpdateExtent(id, Transform2DComponent.data[id][TRANSFORM.FRAME_WIDTH], Transform2DComponent.data[id][TRANSFORM.FRAME_HEIGHT]);
    }

    get y (): number
    {
        return Transform2DComponent.data[this.id][TRANSFORM.ORIGIN_Y];
    }
}
