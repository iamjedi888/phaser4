import { IGameObject3D } from '../gameobjects3d/IGameObject3D';

//  Returns all children of the parent, no matter what depth they go to, using a recursive search.
//  Does NOT include the parent in the results.

export function DepthFirstSearchRecursive3D (parent: IGameObject3D, output: IGameObject3D[] = []): IGameObject3D[]
{
    for (let i = 0; i < parent.numChildren; i++)
    {
        const child = parent.children[i];

        output.push(child);

        if (child.numChildren > 0)
        {
            DepthFirstSearchRecursive3D(child, output);
        }
    }

    return output;
}
