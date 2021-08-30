import { NOOP } from '../../utils/NOOP';

//  4x4 Matrix in column-major format

/**
 * |-----|-----|-----|-----|
 * | m00 | m01 | m02 | m03 |
 * |-----|-----|-----|-----|
 * | m10 | m11 | m12 | m13 |
 * |-----|-----|-----|-----|
 * | m20 | m21 | m22 | m23 |
 * |-----|-----|-----|-----|
 * | m30 | m31 | m32 | m33 |
 * |-----|-----|-----|-----|
 *
 * [0] = m00 - 1st value of 1st row
 * [1] = m01 - 2nd value of 1st row
 * [2] = m02 - 3rd value of 1st row
 * [3] = m03 - 4th value of 1st row
 * [4] = m10 - 1st value of 2nd row
 * [5] = m11 - 2nd value of 2nd row
 * [6] = m12 - 3rd value of 2nd row
 * [7] = m13 - 4th value of 2nd row
 * [8] = m20 - 1st value of 3rd row
 * [9] = m21 - 2nd value of 3rd row
 * [10] = m22 - 3rd value of 3rd row
 * [11] = m23 - 4th value of 3rd row
 * [12] = m30 - 1st value of 4th row
 * [13] = m31 - 2nd value of 4th row
 * [14] = m32 - 3rd value of 4th row
 * [15] = m33 - 4th value of 4th row
 */

export class Matrix4
{
    data: Float32Array;

    onChange: (mat4: Matrix4) => void;

    constructor (src?: Matrix4 | Float32List)
    {
        const data = new Float32Array(16);

        this.data = data;
        this.onChange = NOOP;

        if (src)
        {
            if (Array.isArray(src))
            {
                this.fromArray(src);
            }
            else
            {
                this.fromArray((src as Matrix4).data);
            }
        }
        else
        {
            data[0] = 1;
            data[5] = 1;
            data[10] = 1;
            data[15] = 1;
        }
    }

    set (m00: number, m01: number, m02: number, m03: number, m10: number, m11: number, m12: number, m13: number, m20: number, m21: number, m22: number, m23: number, m30: number, m31: number, m32: number, m33: number): this
    {
        this.data.set([
            m00,
            m01,
            m02,
            m03,

            m10,
            m11,
            m12,
            m13,

            m20,
            m21,
            m22,
            m23,

            m30,
            m31,
            m32,
            m33
        ]);

        this.onChange(this);

        return this;
    }

    toArray (dst: Float32List = [], index: number = 0): Float32List
    {
        const data = this.data;

        for (let i = 0; i < 16; i++)
        {
            dst[ index + i ] = data[i];
        }

        return dst;
    }

    fromArray (src: Float32List, index: number = 0): this
    {
        const data = this.data;

        for (let i = 0; i < 16; i++)
        {
            data[i] = src[ index + i ];
        }

        this.onChange(this);

        return this;
    }

    toString (): string
    {
        return '[ mat4=' + this.data.join(', ') + ' ]';
    }

    destroy (): void
    {
        this.onChange = NOOP;
        this.data = null;
    }
}
