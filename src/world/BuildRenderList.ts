import { CalculateTotalRenderable } from './CalculateTotalRenderable';
import { IBaseWorld } from './IBaseWorld';
import { IsDirtyFrame } from '../components/dirty';
import { RenderDataComponent } from './RenderDataComponent';
import { SearchEntry } from '../display/SearchEntryType';
import { UpdateCachedLayers } from './UpdateCachedLayers';
import { WorldDepthFirstSearch } from './WorldDepthFirstSearch';

export function BuildRenderList (world: IBaseWorld): void
{
    const worldID = world.id;
    const cachedLayers: SearchEntry[] = [];
    const stack: SearchEntry[] = [];

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

    const gameFrame = RenderDataComponent.gameFrame[worldID];

    entries.forEach(entry =>
    {
        if (entry.children.length > 0)
        {
            CalculateTotalRenderable(entry, renderData);
        }
        else
        {
            RenderDataComponent.numRendered[worldID]++;
            RenderDataComponent.numRenderable[worldID]++;

            if (IsDirtyFrame(entry.node.id, gameFrame))
            {
                RenderDataComponent.dirtyFrame[worldID]++;
            }
        }
    });

    world.renderList = entries;

    if (world.forceRefresh)
    {
        RenderDataComponent.dirtyFrame[worldID]++;

        world.forceRefresh = false;
    }

    // console.log(entries);
    // console.log(renderData);
    // eslint-disable-next-line no-debugger
    // debugger;
}
