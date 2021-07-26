import { AddToRenderList } from './AddToRenderList';
import { GameObjectTree } from '../gameobjects/GameObjectTree';
import { GetNumChildren } from '../components/hierarchy/GetNumChildren';
import { HasDirtyChildCache } from '../components/dirty/HasDirtyChildCache';
import { IBaseWorld } from './IBaseWorld';
import { SetWorldDepth } from '../components/hierarchy/SetWorldDepth';
import { WillCacheChildren } from '../components/permissions/WillCacheChildren';
import { WillRender } from '../components/permissions/WillRender';
import { WillRenderChildren } from '../components/permissions/WillRenderChildren';

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
                        SetWorldDepth(nodeID, worldDepth);

                        RebuildWorldList(world, nodeID, worldDepth + 1);
                    }
                    else if (AddToRenderList(world, nodeID, 0))
                    {
                        SetWorldDepth(nodeID, worldDepth);

                        AddToRenderList(world, nodeID, 1);
                    }
                }
                else if (!WillCacheChildren(nodeID) && AddToRenderList(world, nodeID, 0))
                {
                    SetWorldDepth(nodeID, worldDepth);

                    AddToRenderList(world, nodeID, 1);
                }
            }
        }

        if (children.length === 0)
        {
            SetWorldDepth(parent, worldDepth);
        }

        if (world.id !== parent)
        {
            AddToRenderList(world, parent, 1);
        }
    }
}
