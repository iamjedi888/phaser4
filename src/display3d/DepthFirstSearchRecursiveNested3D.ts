import { IGameObject3D } from '../gameobjects3d/IGameObject3D';
import { SearchEntry3D } from './SearchEntry3DType';

//  Returns all children of the parent, no matter what depth they go to, using a recursive search.
//  Parents and children are grouped together.

export function DepthFirstSearchRecursiveNested3D (parent: IGameObject3D, output: SearchEntry3D[] = []): SearchEntry3D[]
{
    for (let i = 0; i < parent.numChildren; i++)
    {
        const node = parent.children[i];

        const children: SearchEntry3D[] = [];

        output.push({ node, children });

        if (node.numChildren > 0)
        {
            DepthFirstSearchRecursiveNested3D(node, children);
        }
    }

    return output;
}
