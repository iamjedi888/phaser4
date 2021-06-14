import { IGameObject } from '../gameobjects/IGameObject';

//  Returns all children of the parent, no matter what depth they go to, using an iterative search.
//  Does NOT include the parent in the results.

export function DepthFirstSearch <P extends IGameObject> (parent: P): IGameObject[]
{
    const stack: IGameObject[] = [ parent ];
    const output: IGameObject[] = [];

    while (stack.length > 0)
    {
        const node = stack.shift();

        output.push(node);

        const numChildren = node.getNumChildren();

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
