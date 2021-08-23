import { IGameObject3D } from '../gameobjects3d/IGameObject3D';

//  Returns all children of the parent, no matter what depth they go to, using an iterative search.
//  Does NOT include the parent in the results.

export function DepthFirstSearch3D (parent: IGameObject3D): IGameObject3D[]
{
    const stack: IGameObject3D[] = [ parent ];
    const output: IGameObject3D[] = [];

    while (stack.length > 0)
    {
        const node = stack.shift();

        output.push(node);

        const numChildren = node.numChildren;

        if (numChildren > 0)
        {
            for (let i = numChildren - 1; i >= 0; i--)
            {
                stack.unshift(node.children[i]);
            }
        }
    }

    //  Remove the parent from the results
    output.shift();

    return output;
}
