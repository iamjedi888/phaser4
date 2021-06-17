import { GameObjectWorld } from '../../GameObjectWorld';
import { LocalMatrix2DComponent } from './LocalMatrix2DComponent';
import { hasComponent } from 'bitecs';

export function InvalidateLocalMatrix2DComponent (id: number): void
{
    if (hasComponent(GameObjectWorld, LocalMatrix2DComponent, id))
    {
        LocalMatrix2DComponent.dirty[id]++;
    }
}
