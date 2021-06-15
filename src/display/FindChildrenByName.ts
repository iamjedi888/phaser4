import { DepthFirstSearch } from './DepthFirstSearch';
import { IGameObject } from '../gameobjects/IGameObject';

export function FindChildrenByName <P extends IGameObject> (parent: P, searchString: string): IGameObject[]
{
    const children = DepthFirstSearch(parent);
    const regex = RegExp(searchString);

    return children.filter(child => regex.test(child.name));
}
