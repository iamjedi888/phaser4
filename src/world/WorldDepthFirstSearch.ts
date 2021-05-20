import { WillCacheChildren, WillRenderChildren } from '../components/permissions';

import { IGameObject } from '../gameobjects/IGameObject';
import { SearchEntry } from '../display/SearchEntryType';

export function WorldDepthFirstSearch (cachedLayers: SearchEntry[], parent: IGameObject, output: SearchEntry[] = []): SearchEntry[]
{
    for (let i = 0; i < parent.numChildren; i++)
    {
        const node = parent.children[i];

        if (node.isRenderable())
        {
            const children: SearchEntry[] = [];

            const entry = { node, children };

            output.push(entry);

            if (node.numChildren > 0 && WillRenderChildren(node.id))
            {
                if (WillCacheChildren(node.id))
                {
                    cachedLayers.push(entry);
                }

                WorldDepthFirstSearch(cachedLayers, node, children);
            }
        }
    }

    return output;
}
