import { GameObjectWorld } from '../GameObjectWorld';
import { GetLocalBounds } from '../components/transform/GetLocalBounds';
import { IGameObject } from '../gameobjects/IGameObject';
import { Rectangle } from '../geom/rectangle/Rectangle';
import { Transform2DComponent } from '../components/transform/Transform2DComponent';
import { hasComponent } from 'bitecs';

export function GetBounds (...children: IGameObject[]): Rectangle
{
    let minX = Number.MAX_SAFE_INTEGER;
    let minY = Number.MAX_SAFE_INTEGER;
    let maxX = Number.MIN_SAFE_INTEGER;
    let maxY = Number.MIN_SAFE_INTEGER;

    children.forEach(child =>
    {
        const childID = child.id;

        if (hasComponent(GameObjectWorld, Transform2DComponent, childID))
        {
            const { left, top, right, bottom } = GetLocalBounds(childID);

            if (left < minX)
            {
                minX = left;
            }

            if (top < minY)
            {
                minY = top;
            }

            if (right > maxX)
            {
                maxX = right;
            }

            if (bottom > maxY)
            {
                maxY = bottom;
            }
        }
    });

    return new Rectangle(minX, minY, maxX, maxY);
}
