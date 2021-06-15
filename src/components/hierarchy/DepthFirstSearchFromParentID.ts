import { GameObjectTree } from '../../gameobjects';

//  Returns ALL children IDs based on the given Parent, to any depth

export function DepthFirstSearchFromParentID (parentID: number): number[]
{
    let stack: number[] = [ parentID ];
    const output: number[] = [];

    while (stack.length > 0)
    {
        const node = stack.shift();

        output.push(node);

        const nodeChildren = GameObjectTree.get(node);

        if (nodeChildren.length > 0)
        {
            stack = stack.concat(nodeChildren);
        }
    }

    //  Remove the parent from the results
    output.shift();

    return output.reverse();
}
