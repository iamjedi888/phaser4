import { GetBounds } from './GetBounds';
import { IGameObject } from '../gameobjects/IGameObject';
import { RectangleToRectangle } from '../geom/intersects/RectangleToRectangle';

//  AABB Overlap test using bounds

export function OverlapBounds (source: IGameObject, ...targets: IGameObject[]): boolean
{
    const sourceBounds = GetBounds(source);

    for (let i = 0; i < targets.length; i++)
    {
        const target = targets[i];

        if (target === source)
        {
            continue;
        }

        if (RectangleToRectangle(sourceBounds, GetBounds(target)))
        {
            return true;
        }
    }

    return false;
}
