import { Changed, addEntity, defineQuery } from 'bitecs';

import { AddSceneRenderDataComponent } from './AddSceneRenderDataComponent';
import { Game } from '../Game';
import { GameInstance } from '../GameInstance';
import { GameObjectWorld } from '../GameObjectWorld';
import { GetScenes } from '../config/scenes';
import { IScene } from './IScene';
import { LocalMatrix2DComponent } from '../components/transform';
import { Once } from '../events';
import { ResetSceneRenderData } from './ResetSceneRenderData';
import { SceneManagerInstance } from './SceneManagerInstance';
import { UpdateLocalTransform2DSystem } from '../components/transform/UpdateLocalTransform2DSystem';
import { UpdateVertexPositionSystem } from '../components/vertices/UpdateVertexPositionSystem';
import { WorldList } from '../world/WorldList';

export class SceneManager
{
    readonly id: number = addEntity(GameObjectWorld);

    game: Game;

    scenes: Map<string, IScene> = new Map();

    //  Used by Install to assign default scene keys when not specified
    sceneIndex: number = 0;

    //  Force the renderer to fully redraw
    flush: boolean;

    changedMatrixQuery = defineQuery([ Changed(LocalMatrix2DComponent) ]);

    constructor ()
    {
        this.game = GameInstance.get();

        SceneManagerInstance.set(this);

        AddSceneRenderDataComponent(this.id);

        Once(this.game, 'boot', () => this.boot());
    }

    boot (): void
    {
        GetScenes().forEach(scene => new scene());
    }

    update (delta: number, time: number): void
    {
        for (const scene of this.scenes.values())
        {
            const worlds = WorldList.get(scene);

            for (const world of worlds)
            {
                world.beforeUpdate(delta, time);
                world.update(delta, time);
                world.afterUpdate(delta, time);
            }
        }

        //  Process all dirty 2D transforms and update the local matrix across all Worlds and Scenes
        UpdateLocalTransform2DSystem(GameObjectWorld);
    }

    //  Run through all Scenes and Worlds within them, telling them to prepare to render
    //  The renderer itself tells them to actually render
    preRender (gameFrame: number): void
    {
        ResetSceneRenderData(this.id, gameFrame);

        const dirtyTransforms: number[] = this.changedMatrixQuery(GameObjectWorld);

        let dirtyWorld = false;

        for (const scene of this.scenes.values())
        {
            const worlds = WorldList.get(scene);

            for (const world of worlds)
            {
                if (world.preRender(gameFrame, dirtyTransforms))
                {
                    dirtyWorld = true;
                }
            }
        }

        //  Update all vertices across the whole game, ready for rendering
        UpdateVertexPositionSystem(GameObjectWorld);

        if (dirtyWorld)
        {
            this.flush = true;
        }
    }
}
