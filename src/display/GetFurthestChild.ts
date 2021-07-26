import { GameObjectWorld } from '../GameObjectWorld';
import { GetChildrenFromParentID } from '../components/hierarchy/GetChildrenFromParentID';
import { GetVec2Distance } from '../math/vec2/GetVec2Distance';
import { IContainer } from '../gameobjects/container/IContainer';
import { IGameObject } from '../gameobjects/IGameObject';
import { IVec2Like } from '../math/vec2/IVec2Like';
import { Transform2DComponent } from '../components/transform/Transform2DComponent';
import { hasComponent } from 'bitecs';

export function GetFurthestChild <P extends IGameObject> (parent: P, point: IVec2Like): IContainer
{
    const children = GetChildrenFromParentID(parent.id);

    let furthest: IContainer = null;
    let distance: number = 0;

    children.forEach(child =>
    {
        if (hasComponent(GameObjectWorld, Transform2DComponent, child.id))
        {
            const childDistance = GetVec2Distance(point, (child as IContainer).position);

            if (!furthest || childDistance > distance)
            {
                furthest = child as IContainer;
                distance = childDistance;
            }
        }
    });

    return furthest;
}
