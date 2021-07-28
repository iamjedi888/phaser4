import { GameObjectWorld } from '../../GameObjectWorld';
import { Transform2DComponent } from './Transform2DComponent';
import { hasComponent } from 'bitecs';

export function InvalidateTransform2DComponent (id: number): void
{
    if (hasComponent(GameObjectWorld, Transform2DComponent, id))
    {
        Transform2DComponent.dirty[id]++;
    }
}
