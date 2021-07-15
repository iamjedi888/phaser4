import { GetNumChildren, SetWorldDepth } from '../components/hierarchy';
import { WillCacheChildren, WillRender, WillRenderChildren } from '../components/permissions';

import { AddToRenderList } from './AddToRenderList';
import { GameObjectTree } from '../gameobjects';
import { HasDirtyChildCache } from '../components/dirty';
import { IBaseWorld } from './IBaseWorld';

//  Rebuilds the World.renderList - a list of all entities that need to render.

//  This is only called if the World has a dirty display list, otherwise the results
//  are cached between frames

export function RebuildWorldList (world: IBaseWorld, parent: number, worldDepth: number): void
{
    if (WillRender(parent))
    {
        let entityAdded = true;

        if (world.id !== parent)
        {
            entityAdded = AddToRenderList(world, parent, 0);
        }

        SetWorldDepth(parent, worldDepth);

        if (!entityAdded)
        {
            return;
        }

        const children = GameObjectTree.get(parent);

        for (let i = 0; i < children.length; i++)
        {
            const nodeID = children[i];

            if (WillRender(nodeID))
            {
                if (GetNumChildren(nodeID) > 0 && WillRenderChildren(nodeID))
                {
                    //  Is a Child Cache, like a Render Layer, or doesn't cache children, like a Container
                    if (!WillCacheChildren(nodeID) || HasDirtyChildCache(nodeID))
                    {
                        RebuildWorldList(world, nodeID, worldDepth + 1);
                    }
                    else if (AddToRenderList(world, nodeID, 0))
                    {
                        AddToRenderList(world, nodeID, 1);

                        SetWorldDepth(nodeID, worldDepth);
                    }
                }
                else if (!WillCacheChildren(nodeID) && AddToRenderList(world, nodeID, 0))
                {
                    AddToRenderList(world, nodeID, 1);

                    SetWorldDepth(nodeID, worldDepth);
                }
            }
        }

        if (world.id !== parent)
        {
            AddToRenderList(world, parent, 1);
        }
    }
}
