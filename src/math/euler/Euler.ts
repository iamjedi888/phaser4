import { Vec3Callback } from '../vec3/Vec3Callback';
import { Vec3CallbackType } from '../vec3/Vec3Callback';

export class Euler extends Vec3Callback
{
    order: string;

    constructor (onChange: Vec3CallbackType, x: number = 0, y: number = 0, z: number = 0, order: string = 'YXZ')
    {
        super(onChange, x, y, z);

        this.order = order;
    }

    reorder (order: string): this
    {
        this.order = order;

        this.onChange(this);

        return this;
    }
}
