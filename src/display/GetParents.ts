import { IGameObject } from '../gameobjects/IGameObject';

export function GetParents <T extends IGameObject> (child: T): T[]
{
    const parents: T[] = [];

    let currentParent: T;

    while (child.hasParent())
    {
        currentParent = child.getParent() as T;

        parents.push(currentParent);

        child = currentParent;
    }

    return parents;
}
