import { IGameObject } from '../gameobjects/IGameObject';
import { RemoveChildrenBetween } from './RemoveChildrenBetween';
import { SetDirtyWorldDisplayList } from '../components/dirty/SetDirtyWorldDisplayList';

export function DestroyChildren <T extends IGameObject> (parent: T, beginIndex: number = 0, endIndex?: number): void
{
    const removed = RemoveChildrenBetween(parent, beginIndex, endIndex);

    removed.forEach(child =>
    {
        child.destroy();
    });

    SetDirtyWorldDisplayList(parent.id);
}
