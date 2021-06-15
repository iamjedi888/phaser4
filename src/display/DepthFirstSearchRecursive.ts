import { IGameObject } from '../gameobjects/IGameObject';

//  Returns all children of the parent, no matter what depth they go to, using a recursive search.
//  Does NOT include the parent in the results.

export function DepthFirstSearchRecursive <P extends IGameObject> (parent: P, output: IGameObject[] = []): IGameObject[]
{
    for (const child of parent.getChildren())
    {
        output.push(child);

        if (child.getNumChildren() > 0)
        {
            DepthFirstSearchRecursive(child, output);
        }
    }

    return output;
}
