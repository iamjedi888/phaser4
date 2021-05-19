import { DIRTY_CONST } from '../DIRTY_CONST';
import { GameObject } from '../GameObject';
import { IContainer } from './IContainer';

export class Container extends GameObject implements IContainer
{
    protected _alpha: number = 1;

    constructor (x: number = 0, y: number = 0)
    {
        super(x, y);
    }

    get alpha (): number
    {
        return this._alpha;
    }

    set alpha (value: number)
    {
        if (value !== this._alpha)
        {
            this._alpha = value;

            this.vertices.forEach(vertex =>
            {
                vertex.setAlpha(value);
            });

            this.setDirty(DIRTY_CONST.COLORS);
        }
    }
}
