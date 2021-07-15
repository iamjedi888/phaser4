import { Changed, Query, addEntity, defineQuery } from 'bitecs';

import { AddRenderStatsComponent } from './AddRenderStatsComponent';
import { Game } from '../Game';
import { GameInstance } from '../GameInstance';
import { GameObjectWorld } from '../GameObjectWorld';
import { GetScenes } from '../config/scenes';
import { IGameObject } from '../gameobjects/IGameObject';
import { IScene } from './IScene';
import { LocalMatrix2DComponent } from '../components/transform';
import { Once } from '../events';
import { PackQuadColorsSystem } from '../components/color/PackQuadColorsSystem';
import { RenderStatsComponent } from './RenderStatsComponent';
import { ResetRenderStats } from './ResetRenderStats';
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

    changedMatrixQuery: Query = defineQuery([ Changed(LocalMatrix2DComponent) ]);

    constructor ()
    {
        this.game = GameInstance.get();

        SceneManagerInstance.set(this);

        AddRenderStatsComponent(this.id);

        Once(this.game, 'boot', () => this.boot());
    }

    boot (): void
    {
        GetScenes().forEach(scene => new scene());
    }

    update (delta: number, time: number, gameFrame: number): void
    {
        for (const scene of this.scenes.values())
        {
            const worlds = WorldList.get(scene);

            for (const world of worlds)
            {
                world.beforeUpdate(delta, time);
            }

            for (const world of worlds)
            {
                world.update(delta, time);
            }

            for (const world of worlds)
            {
                world.afterUpdate(delta, time);
            }
        }

        //  TODO - Move to start of function, remove sceneTotal var, get the worlds to update the stats directly
        // ResetRenderStats(this.id, gameFrame, sceneTotal, worldTotal, 0);
        ResetRenderStats(this.id, gameFrame, 1, 1, 0);
    }

    //  Run through all Scenes and Worlds within them, telling them to prepare to render
    //  The renderer itself tells them to actually render
    preRender (gameFrame: number): void
    {
        //  TODO - This can almost certainly be avoided, as we know what changed
        //  in the UpdateLocalTransform2DSystem, then we don't need to pass it to the world
        // const dirtyTransforms = this.changedMatrixQuery(GameObjectWorld);

        let dirtyWorld = false;

        for (const scene of this.scenes.values())
        {
            const worlds = WorldList.get(scene);

            for (const world of worlds)
            {
                if (world.preRender(gameFrame))
                {
                    dirtyWorld = true;
                }
            }
        }

        PackQuadColorsSystem(GameObjectWorld);

        if (dirtyWorld)
        {
            this.flush = true;
        }
    }

    //  TODO - This isn't used internally - is used by debug panel - move out?
    getRenderList (): IGameObject[]
    {
        let output: IGameObject[] = [];

        for (const scene of this.scenes.values())
        {
            const worlds = WorldList.get(scene);

            for (const world of worlds)
            {
                output = output.concat(world.getRenderList());
            }
        }

        return output;
    }

    updateWorldStats (numGameObjects: number, numRendered: number, numDisplayLists: number, numWorldTransforms: number): void
    {
        const id = this.id;

        RenderStatsComponent.numGameObjects[id] += numGameObjects;
        RenderStatsComponent.numGameObjectsRendered[id] += numRendered;
        RenderStatsComponent.numDirtyWorldLists[id] += numDisplayLists;
        RenderStatsComponent.numDirtyWorldTransforms[id] += numWorldTransforms;
    }
}
