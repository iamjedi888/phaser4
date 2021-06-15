import { DepthFirstSearch } from './DepthFirstSearch';
import { IGameObject } from '../gameobjects/IGameObject';

//  Searhes for the first child matching the given string and returns it

export function FindChildByName <P extends IGameObject> (parent: P, searchString: string): IGameObject | undefined
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
