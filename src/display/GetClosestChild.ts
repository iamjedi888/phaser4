import { GameObjectWorld } from '../GameObjectWorld';
import { GetChildrenFromParentID } from '../components/hierarchy';
import { GetVec2Distance } from '../math/vec2/GetVec2Distance';
import { IContainer } from '../gameobjects/container/IContainer';
import { IGameObject } from '../gameobjects/IGameObject';
import { IVec2Like } from '../math/vec2/IVec2Like';
import { Transform2DComponent } from '../components/transform';
import { hasComponent } from 'bitecs';

export function GetClosestChild <P extends IGameObject> (parent: P, point: IVec2Like): IContainer
{
    const children = GetChildrenFromParentID(parent.id);

    let closest: IContainer = null;
    let distance: number = 0;

    children.forEach(child =>
    {
        if (hasComponent(GameObjectWorld, Transform2DComponent, child.id))
        {
            const childDistance = GetVec2Distance(point, (child as IContainer).position);

            if (!closest || childDistance < distance)
            {
                closest = child as IContainer;
                distance = childDistance;
            }
        }
    });

    return closest;
}
