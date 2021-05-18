import { GetVec2Distance } from '../math/vec2/GetVec2Distance';
import { IGameObject } from '../gameobjects/IGameObject';
import { Vec2 } from '../math/vec2/Vec2';

export function GetClosestChild (parent: IGameObject, point: Vec2): IGameObject
{
    const children = parent.children;

    let closest: IGameObject = null;
    let distance: number = 0;

    children.forEach(child =>
    {
        const childDistance = GetVec2Distance(point, child.getPosition());

        if (!closest || childDistance < distance)
        {
            closest = child;
            distance = childDistance;
        }

    });

    return closest;
}
