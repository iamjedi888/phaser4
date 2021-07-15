import { AddRenderStatsComponent } from './AddRenderStatsComponent';
import { Game } from '../Game';
import { GameInstance } from '../GameInstance';
import { GameObjectWorld } from '../GameObjectWorld';
import { GetScenes } from '../config/scenes';
import { IGameObject } from '../gameobjects/IGameObject';
import { IScene } from './IScene';
import { Once } from '../events';
import { PackQuadColorsSystem } from '../components/color/PackQuadColorsSystem';
import { RenderStatsComponent } from './RenderStatsComponent';
import { ResetRenderStats } from './ResetRenderStats';
import { SceneManagerInstance } from './SceneManagerInstance';
import { WorldList } from '../world/WorldList';
import { addEntity } from 'bitecs';

export class SceneManager
{
    readonly id: number = addEntity(GameObjectWorld);

    game: Game;

    scenes: Map<string, IScene> = new Map();

    //  Used by Install to assign default scene keys when not specified
    sceneIndex: number = 0;

    //  Force the renderer to fully redraw
    flush: boolean;

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
        ResetRenderStats(this.id, gameFrame, this.scenes.size);

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
    }

    //  Run through all Scenes and Worlds within them, telling them to prepare to render
    //  The renderer itself tells them to actually render
    preRender (gameFrame: number): void
    {
        for (const scene of this.scenes.values())
        {
            const worlds = WorldList.get(scene);

            for (const world of worlds)
            {
                if (world.preRender(gameFrame))
                {
                    //  This property is reset in Game.step
                    this.flush = true;
                }
            }
        }

        PackQuadColorsSystem(GameObjectWorld);
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
