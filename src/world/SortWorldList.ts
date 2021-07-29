import { GameObjectCache } from '../gameobjects';
import { GameObjectTree } from '../gameobjects/GameObjectTree';
import { IBaseWorld } from './IBaseWorld';
import { SetDirtyDisplayList } from '../components/dirty';

//  Property must be numeric (x, y, scale, etc)
export function SortWorldList (world: IBaseWorld, property: string): void
{
    const children = GameObjectTree.get(world.id);

    children.sort((a: number, b: number) =>
    {
        const childA = GameObjectCache.get(a);
        const childB = GameObjectCache.get(b);

        return childA[property] - childB[property];
    });

    SetDirtyDisplayList(world.id);
}
