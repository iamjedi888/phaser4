import { GameObjectWorld } from '../GameObjectWorld';
import { SceneRenderDataComponent } from './SceneRenderDataComponent';
import { addComponent } from 'bitecs';

export function AddSceneRenderDataComponent (id: number): void
{
    addComponent(GameObjectWorld, SceneRenderDataComponent, id);
}
