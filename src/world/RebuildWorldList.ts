import { AddToRenderList } from './AddToRenderList';
import { GameObjectTree } from '../gameobjects/GameObjectTree';
import { GetNumChildren } from '../components/hierarchy/GetNumChildren';
import { HasDirtyChildCache } from '../components/dirty/HasDirtyChildCache';
import { HasRenderableChildren } from '../components/permissions';
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

export function RebuildWorldList (world: IBaseWorld, parent: number): void
{
    if (WillRender(parent))
    {
        if (HasRenderableChildren(parent))
        {
            if (parent !== world.id)
            {
                AddToRenderList(world, parent, 0);
            }

            const children = GameObjectTree.get(parent);

            for (let i = 0; i < children.length; i++)
            {
                const childID = children[i];

                if (WillRender(childID))
                {
                    RebuildWorldList(world, childID);
                }
            }

            AddToRenderList(world, parent, 1);
        }
        else if (parent !== world.id)
        {
            AddToRenderList(world, parent, 2);
        }
    }
}
