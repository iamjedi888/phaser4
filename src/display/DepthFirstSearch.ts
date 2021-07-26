import { DepthFirstSearchFromParentID } from '../components/hierarchy/DepthFirstSearchFromParentID';
import { GameObjectCache } from '../gameobjects/GameObjectCache';
import { IGameObject } from '../gameobjects/IGameObject';

//  Returns all children of the parent, no matter what depth they go to, using an iterative search.
//  Does NOT include the parent in the results.

export function DepthFirstSearch <P extends IGameObject> (parent: P): IGameObject[]
{
    const children = DepthFirstSearchFromParentID(parent.id);

    return children.map(id => GameObjectCache.get(id));
}
