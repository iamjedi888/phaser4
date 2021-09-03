import { ClearDirtyColor } from '../dirty/ClearDirtyColor';
import { HasDirtyColor } from '../dirty/HasDirtyColor';
import { SetQuadColor } from '../vertices/SetQuadColor';

export function UpdateQuadColorSystem (entities: number[]): number
{
    let total = 0;
    const len = entities.length;

    for (let i = 0; i < len; i++)
    {
        const id = entities[i];

        if (HasDirtyColor(id))
        {
            // const r = ColorComponent.r[id] / 255;
            // const g = ColorComponent.g[id] / 255;
            // const b = ColorComponent.b[id] / 255;
            // const a = ColorComponent.a[id];

            // SetQuadColor(id, r, g, b, a);

            SetQuadColor(id, 1, 1, 1, 1);

            ClearDirtyColor(id);

            total++;
        }
    }

    return total;
}
