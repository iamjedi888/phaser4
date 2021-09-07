import { GetWorldFromParentID } from '../components/hierarchy/GetWorldFromParentID';
import { IGameObject } from '../gameobjects/IGameObject';
import { RemoveChildrenBetween } from './RemoveChildrenBetween';

export function DestroyChildren <T extends IGameObject> (parent: T, beginIndex: number = 0, endIndex?: number): void
{
    const removed = RemoveChildrenBetween(parent, beginIndex, endIndex);

    removed.forEach(child =>
    {
        child.destroy();
    });

    const world = GetWorldFromParentID(parent.id);

    if (world)
    {
        world.updateDisplayList = true;
    }
}
