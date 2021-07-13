import { ColorComponent } from '../components/color';
import { GameObjectWorld } from '../GameObjectWorld';
import { hasComponent } from 'bitecs';

export function SetColorMatrix (id: number, values: number[], multiply: boolean = false): boolean
{
    if (hasComponent(GameObjectWorld, ColorComponent, id))
    {
        const colorMatrix = ColorComponent.colorMatrix[id];

        if (!multiply)
        {
            colorMatrix.set(values);
        }
        else
        {
            //  Ok, we're multiplying the matricies here
            const copy = Float32Array.from(colorMatrix);

            let c = 0;
            let offset = 0;

            copy.forEach((v: number, i: number) =>
            {
                colorMatrix[i] =
                    (copy[ offset ] * values[ c ]) +
                    (copy[ offset + 1 ] * values[ c + 4 ]) +
                    (copy[ offset + 2 ] * values[ c + 8 ]) +
                    (copy[ offset + 3 ] * values[ c + 12 ]);

                c++;

                if (i === 3 || i === 7 || i === 11)
                {
                    offset += 4;
                    c = 0;
                }
            });
        }

        return true;

        // The constants:
        // m[4] = (c[0] * a[4]) + (c[1] * a[9]) + (c[2] * a[14]) + (c[3] * a[19]) + c[4];
        // m[9] = (c[5] * a[4]) + (c[6] * a[9]) + (c[7] * a[14]) + (c[8] * a[19]) + c[9];
        // m[14] = (c[10] * a[4]) + (c[11] * a[9]) + (c[12] * a[14]) + (c[13] * a[19]) + c[14];
        // m[19] = (c[15] * a[4]) + (c[16] * a[9]) + (c[17] * a[14]) + (c[18] * a[19]) + c[19];
    }

    return false;
}
