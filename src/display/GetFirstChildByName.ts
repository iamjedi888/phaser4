import { DepthFirstSearch } from './DepthFirstSearch';
import { IGameObject } from '../gameobjects/IGameObject';

//  Searches for the first child name matching the given string and return it

export function GetFirstChildByName <P extends IGameObject> (parent: P, searchString: string): IGameObject | undefined
{
    const children = DepthFirstSearch(parent);
    const regex = RegExp(searchString);

    for (let i = 0; i < children.length; i++)
    {
        const child = children[i];

        if (regex.test(child.name))
        {
            return child;
        }
    }
}
