import { Game } from '../Game';
import { GameInstance } from '../GameInstance';
import { GetScenes } from '../config/scenes/GetScenes';
import { IRenderPass } from '../renderer/webgl1/renderpass/IRenderPass';
import { IScene } from './IScene';
import { Once } from '../events/Once';
import { ResetRenderStats } from './ResetRenderStats';
import { SceneManagerInstance } from './SceneManagerInstance';
import { WorldList } from '../world/WorldList';

export class SceneManager
{
    game: Game;

    scenes: Map<string, IScene> = new Map();

    //  Used by Install to assign default scene keys when not specified
    sceneIndex: number = 0;

    //  Force the renderer to fully redraw
    flush: boolean;

    constructor ()
    {
        SceneManagerInstance.set(this);

        this.game = GameInstance.get();

        Once(this.game, 'boot', () => this.boot());
    }

    boot (): void
    {
        const scenes = GetScenes();

        if (scenes)
        {
            scenes.forEach(scene => new scene());
        }
    }

    update (): void
    {
        const time = this.game.time;

        const delta = time.delta;
        const now = time.lastTick;
        const gameFrame = time.frame;

        ResetRenderStats(gameFrame, this.scenes.size);

        for (const scene of this.scenes.values())
        {
            const worlds = WorldList.get(scene);

            for (const world of worlds)
            {
                world.beforeUpdate(delta, now);
            }

            if (scene.update)
            {
                scene.update(delta, now);
            }

            for (const world of worlds)
            {
                world.update(delta, now);
            }

            for (const world of worlds)
            {
                world.afterUpdate(delta, now);
            }
        }
    }

    //  Run through all Scenes and Worlds within them, telling them to prepare to render
    preRender (): void
    {
        const gameFrame = this.game.time.frame;

        for (const scene of this.scenes.values())
        {
            const worlds = WorldList.get(scene);

            for (const world of worlds)
            {
                if (world.preRender(gameFrame))
                {
                    this.flush = true;
                }
            }
        }
    }

    render (renderPass: IRenderPass): void
    {
        for (const scene of this.scenes.values())
        {
            const worlds = WorldList.get(scene);

            for (const world of worlds)
            {
                world.renderGL(renderPass);
            }
        }

        this.flush = false;
    }

    //  TODO - This isn't used internally - is used by debug panel - move out?
    /*
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
    */
}
