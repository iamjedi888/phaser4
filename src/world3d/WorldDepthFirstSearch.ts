import { IGameObject3D } from '../gameobjects3d/IGameObject3D';
import { SearchEntry3D } from '../display3d/SearchEntry3DType';

export function WorldDepthFirstSearch (cachedLayers: SearchEntry3D[], parent: IGameObject3D, output: SearchEntry3D[] = []): SearchEntry3D[]
{
    for (let i = 0; i < parent.numChildren; i++)
    {
        const node = parent.children[i];

        if (node.isRenderable())
        {
            const children: SearchEntry3D[] = [];

            const entry = { node, children };

            output.push(entry);

            if (node.willRenderChildren && node.numChildren > 0)
            {
                if (node.willCacheChildren)
                {
                    cachedLayers.push(entry);
                }

                WorldDepthFirstSearch(cachedLayers, node, children);
            }
        }
    }

    return output;
}
