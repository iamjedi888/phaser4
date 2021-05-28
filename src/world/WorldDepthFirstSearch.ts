import { GameObjectCache, GameObjectTree } from '../gameobjects';
import { WillCacheChildren, WillRender, WillRenderChildren } from '../components/permissions';

import { GetNumChildren } from '../components/hierarchy';
import { IBaseWorld } from './IBaseWorld';
import { UpdateWorldTransform } from '../components/transform';

export function WorldDepthFirstSearch (world: IBaseWorld, parent: number): void
{
    if (WillRender(parent))
    {
        world.renderList.add(GameObjectCache.get(parent));

        UpdateWorldTransform(parent);

        const children = GameObjectTree.get(parent);

        for (let i = 0; i < children.length; i++)
        {
            const nodeID = children[i];

            if (WillRender(nodeID))
            {
                if (GetNumChildren(nodeID) > 0 && WillRenderChildren(nodeID))
                {
                    if (WillCacheChildren(nodeID))
                    {
                        // cachedLayers.push(entry);
                    }

                    WorldDepthFirstSearch(world, nodeID);
                }
                else
                {
                    world.renderList.add(GameObjectCache.get(nodeID));

                    UpdateWorldTransform(nodeID);
                }
            }
        }
    }
}
