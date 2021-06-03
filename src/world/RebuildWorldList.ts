import { WillCacheChildren, WillRender, WillRenderChildren } from '../components/permissions';

import { GameObjectTree } from '../gameobjects';
import { GetNumChildren } from '../components/hierarchy';
import { IBaseWorld } from './IBaseWorld';

export function RebuildWorldList (world: IBaseWorld, parent: number): void
{
    const renderList = world.renderList;
    const renderType = world.renderType;

    if (WillRender(parent))
    {
        if (world.id !== parent)
        {
            renderList.push(parent);
            renderType.push(0);
        }

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

                    RebuildWorldList(world, nodeID);
                }
                else
                {
                    renderList.push(nodeID, nodeID);
                    renderType.push(0, 1);
                }
            }
        }

        if (world.id !== parent)
        {
            renderList.push(parent);
            renderType.push(1);
        }
    }
}
