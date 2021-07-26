import { GameObjectTree } from '../../gameobjects/GameObjectTree';

//  Returns ALL children IDs based on the given Parent, to any depth

export function DepthFirstSearchFromParentID (parentID: number): number[]
{
    const stack: number[] = [ parentID ];
    const output: number[] = [];

    while (stack.length > 0)
    {
        const node = stack.shift();

        output.push(node);

        const nodeChildren = GameObjectTree.get(node);

        const numChildren = nodeChildren.length;

        if (numChildren > 0)
        {
            for (let i = numChildren - 1; i >= 0; i--)
            {
                stack.unshift(nodeChildren[i]);
            }
        }
    }

    //  Remove the parent from the results
    output.shift();

    return output;
}
