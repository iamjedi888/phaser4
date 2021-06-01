import { WillCacheChildren, WillRender, WillRenderChildren } from '../components/permissions';

import { GameObjectTree } from '../gameobjects';
import { GetNumChildren } from '../components/hierarchy';
import { IBaseWorld } from './IBaseWorld';
import { UpdateWorldTransform } from '../components/transform';

export function WorldDepthFirstSearch (world: IBaseWorld, parent: number): void
{
    const renderList = world.renderList;
    const renderType = world.renderType;

    if (WillRender(parent))
    {
        UpdateWorldTransform(parent);

        const children = GameObjectTree.get(parent);

        for (let i = 0; i < children.length; i++)
        {
            const nodeID = children[i];

            if (WillRender(nodeID))
            {
                if (GetNumChildren(nodeID) > 0 && WillRenderChildren(nodeID))
                {
                    //  TODO
                    // if (WillCacheChildren(nodeID))
                    // {
                    //     cachedLayers.push(entry);
                    // }

                    renderList.push(nodeID);
                    renderType.push(0);

                    WorldDepthFirstSearch(world, nodeID);
                }
                else
                {
                    renderList.push(nodeID);
                    renderType.push(0);

                    UpdateWorldTransform(nodeID);
                }
            }
        }

        renderList.push(nodeID);
        renderType.push(1);
    }
}
