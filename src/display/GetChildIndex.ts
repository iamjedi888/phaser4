import { HierarchyComponent } from '../components/hierarchy/HierarchyComponent';
import { IGameObject } from '../gameobjects/IGameObject';

export function GetChildIndex <T extends IGameObject> (child: T): number
{
    return HierarchyComponent.index[child.id];
}
