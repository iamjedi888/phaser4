import { AddChildAt } from './AddChildAt';
import { IGameObject } from '../gameobjects/IGameObject';

//  Adds all of the children to the given parent
//  If already a child of the parent, it is skipped
//  If already child of another parent, it is removed from it first

export function SetParent <P extends IGameObject, C extends IGameObject> (parent: P, ...children: C[]): C[]
{
    children.forEach(child =>
    {
        AddChildAt(parent, child);
    });

    return children;
}
