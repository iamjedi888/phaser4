import { BaseCamera } from './BaseCamera';
import { ClearDirtyTransform } from '../components/dirty/ClearDirtyTransform';
import { HasDirtyTransform } from '../components/dirty/HasDirtyTransform';
import { IWorldCamera } from './IWorldCamera';
import { Position } from '../components/transform/Position';
import { SetBounds } from '../components/transform/SetBounds';

//  A World Camera has a size, position and scale.

export class WorldCamera extends BaseCamera implements IWorldCamera
{
    readonly type: string = 'WorldCamera';

    position: Position;

    constructor (width: number, height: number)
    {
        super(width, height);

        this.position = new Position(this.id, 0, 0);
    }

    set x (value: number)
    {
        this.position.x = value;
    }

    get x (): number
    {
        return this.position.x;
    }

    set y (value: number)
    {
        this.position.y = value;
    }

    get y (): number
    {
        return this.position.y;
    }

    setPosition (x: number, y?: number): this
    {
        this.position.set(x, y);

        return this;
    }

    preRender (): boolean
    {
        const id = this.id;

        if (HasDirtyTransform(id))
        {
            const x = this.x;
            const y = this.y;

            const w = this.size.width;
            const h = this.size.height;

            const ox = -x + (w / 2);
            const oy = -y + (h / 2);

            const bx = ox - (w / 2);
            const by = oy - (h / 2);

            SetBounds(id, bx, by, bx + w, by + h);

            const data = this.matrix.data;

            data[12] = this.x;
            data[13] = this.y;

            ClearDirtyTransform(id);

            this.isDirty = true;

            return true;
        }

        return false;
    }
}
