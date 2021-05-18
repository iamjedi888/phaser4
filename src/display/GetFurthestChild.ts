import { GetVec2Distance } from '../math/vec2/GetVec2Distance';
import { IGameObject } from '../gameobjects/IGameObject';
import { Vec2 } from '../math/vec2/Vec2';

export function GetFurthestChild (parent: IGameObject, point: Vec2): IGameObject
{
    const children = parent.children;

    let furthest: IGameObject = null;
    let distance: number = 0;

    children.forEach(child =>
    {
        const childDistance = GetVec2Distance(point, child.getPosition());

        if (!furthest || childDistance > distance)
        {
            furthest = child;
            distance = childDistance;
        }

    });

    return furthest;
}
