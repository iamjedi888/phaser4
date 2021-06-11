import { IVec2 } from './IVec2';
import { Vec2FromArray } from './Vec2FromArray';
import { Vec2ToArray } from './Vec2ToArray';

export class Vec2 implements IVec2
{
    x: number;
    y: number;

    constructor (x: number = 0, y: number = 0)
    {
        this.set(x, y);
    }

    set (x: number = 0, y: number = 0): this
    {
        this.x = x;
        this.y = y;

        return this;
    }

    toArray (dst: Float32List = [], index: number = 0): Float32List
    {
        return Vec2ToArray(this, dst, index);
    }

    fromArray (src: Float32List, index: number = 0): this
    {
        Vec2FromArray(this, src, index);

        return this;
    }

    toString (): string
    {
        return `{ x=${this.x}, y=${this.y} }`;
    }
}
