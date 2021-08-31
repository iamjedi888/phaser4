import { ClearWorld } from './ClearWorld';
import { IBaseWorld } from '../world/IBaseWorld';
import { IGameObject } from '../gameobjects/IGameObject';

export function RemoveWorld <W extends IBaseWorld, C extends IGameObject> (world: W, ...children: C[]): C[]
{
    children.forEach(child =>
    {
        ClearWorld(child.id);
    });

    return children;
}
