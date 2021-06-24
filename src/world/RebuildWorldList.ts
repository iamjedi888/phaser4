import { GetNumChildren, GetPostRenderType, GetRenderType } from '../components/hierarchy';
import { WillRender, WillRenderChildren } from '../components/permissions';

import { GameObjectTree } from '../gameobjects';
import { IBaseWorld } from './IBaseWorld';

//  Rebuilds the World.renderList - a list of all entities that need to render.

//  This is only called if the World has a dirty display list, otherwise the results
//  are cached between frames

export function RebuildWorldList (world: IBaseWorld, parent: number): void
{
    if (WillRender(parent))
    {
        if (world.id !== parent)
        {
            world.addToRenderList(parent, GetRenderType(parent));
        }

        const children = GameObjectTree.get(parent);

        for (let i = 0; i < children.length; i++)
        {
            const nodeID = children[i];

            if (WillRender(nodeID))
            {
                if (GetNumChildren(nodeID) > 0 && WillRenderChildren(nodeID))
                {
                    RebuildWorldList(world, nodeID);
                }
                else
                {
                    world.addToRenderList(nodeID, 0);
                    world.addToRenderList(nodeID, 1);
                }
            }
        }

        if (world.id !== parent)
        {
            world.addToRenderList(parent, GetPostRenderType(parent));
        }
    }
}
