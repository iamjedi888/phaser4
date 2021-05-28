import { GameObjectCache, GameObjectTree } from '../gameobjects';
import { WillCacheChildren, WillRender, WillRenderChildren } from '../components/permissions';

import { GetNumChildren } from '../components/hierarchy';
import { WorldRenderList } from './WorldRenderList';

export function WorldDepthFirstSearch (parent: number): void
{
    if (WillRender(parent))
    {
        WorldRenderList.add(GameObjectCache.get(parent));

        const children = GameObjectTree.get(parent);

        for (let i = 0; i < children.length; i++)
        {
            const nodeID = children[i];

            if (WillRender(nodeID))
            {
                WorldRenderList.add(GameObjectCache.get(nodeID));

                if (GetNumChildren(nodeID) > 0 && WillRenderChildren(nodeID))
                {
                    if (WillCacheChildren(nodeID))
                    {
                        // cachedLayers.push(entry);
                    }

                    WorldDepthFirstSearch(nodeID);
                }
            }
        }
    }
}
