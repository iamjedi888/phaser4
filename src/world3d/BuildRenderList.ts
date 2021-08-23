import { CalculateTotalRenderable } from './CalculateTotalRenderable';
import { IBaseWorld3D } from './IBaseWorld3D';
import { SearchEntry3D } from '../display3d/SearchEntry3DType';
import { UpdateCachedLayers } from './UpdateCachedLayers';
import { WorldDepthFirstSearch } from './WorldDepthFirstSearch';

export function BuildRenderList (world: IBaseWorld3D): void
{
    const cachedLayers: SearchEntry3D[] = [];
    const stack: SearchEntry3D[] = [];

    //  entries is now populated with the n-tree search results, only containing nodes that will actually render
    const entries = WorldDepthFirstSearch(cachedLayers, world, stack);

    const renderData = world.renderData;

    //  We can now sweep through the entries and purge non-dirty children of cached layers,
    //  before finally building the render list. We can only do this if the camera is clean.

    if (cachedLayers.length > 0)
    {
        UpdateCachedLayers(cachedLayers, world.camera.dirtyRender);
    }

    //  TODO: numRenderable probably needs to move to the search function
    entries.forEach(entry =>
    {
        if (entry.children.length > 0)
        {
            CalculateTotalRenderable(entry, renderData);
        }
        else
        {
            renderData.numRendered++;
            renderData.numRenderable++;

            if (entry.node.dirtyFrame >= renderData.gameFrame)
            {
                renderData.dirtyFrame++;
            }
        }
    });

    world.renderList = entries;

    if (world.forceRefresh)
    {
        renderData.dirtyFrame++;

        world.forceRefresh = false;
    }

    // console.log(entries);
    // console.log(renderData);
    // eslint-disable-next-line no-debugger
    // debugger;
}
