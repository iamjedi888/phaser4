import { AddToRenderList } from './AddToRenderList';
import { GameObjectTree } from '../gameobjects/GameObjectTree';
import { GetNumChildren } from '../components/hierarchy/GetNumChildren';
import { HasDirtyChildCache } from '../components/dirty/HasDirtyChildCache';
import { IBaseWorld } from './IBaseWorld';
import { SetWorldDepth } from '../components/hierarchy/SetWorldDepth';
import { WillCacheChildren } from '../components/permissions/WillCacheChildren';
import { WillRender } from '../components/permissions/WillRender';
import { WillRenderChildren } from '../components/permissions/WillRenderChildren';

//  Rebuilds the World.renderList - a list of all entities that could potentially render.

//  This is only called if the World has a dirty display list, otherwise the results
//  are cached between frames.

//  This will rebuild the render list for the whole world by calling AddToRenderList
//  for all game objects that will render (not invisible, etc)

export function RebuildWorldList (world: IBaseWorld, parent: number, worldDepth: number): void
{
    if (WillRender(parent))
    {
        if (world.id !== parent)
        {
            AddToRenderList(world, parent, 0);
        }

        const children = GameObjectTree.get(parent);

        for (let i = 0; i < children.length; i++)
        {
            const nodeID = children[i];

            if (WillRender(nodeID))
            {
                if (GetNumChildren(nodeID) > 0 && WillRenderChildren(nodeID))
                {
                    //  A Container *won't* cache children, but a RenderLayer *will* cache children
                    if (!WillCacheChildren(nodeID) || (WillCacheChildren(nodeID) && HasDirtyChildCache(nodeID)))
                    {
                        SetWorldDepth(nodeID, worldDepth);

                        RebuildWorldList(world, nodeID, worldDepth + 1);
                    }
                     // else
                    // {
                    //     SetWorldDepth(nodeID, worldDepth);

                    //     AddToRenderList(world, nodeID, 0);
                    //     AddToRenderList(world, nodeID, 1);
                    // }
                }
                else if (!WillCacheChildren(nodeID))
                {
                    SetWorldDepth(nodeID, worldDepth);

                    AddToRenderList(world, nodeID, 0);
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
