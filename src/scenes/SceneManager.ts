import { Changed, addEntity, defineQuery } from 'bitecs';

import { AddSceneRenderDataComponent } from './AddSceneRenderDataComponent';
import { Game } from '../Game';
import { GameInstance } from '../GameInstance';
import { GameObjectWorld } from '../GameObjectWorld';
import { GetScenes } from '../config/scenes';
import { IScene } from './IScene';
import { ISceneRenderData } from './ISceneRenderData';
import { LocalMatrix2DComponent } from '../components/transform';
import { Once } from '../events';
import { ResetSceneRenderData } from './ResetSceneRenderData';
import { SceneManagerInstance } from './SceneManagerInstance';
import { SceneRenderDataComponent } from './SceneRenderDataComponent';
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

    //  Flush the cache
    flush: boolean = false;

    changedMatrixQuery = defineQuery([ Changed(LocalMatrix2DComponent) ]);

    private renderData: ISceneRenderData;

    constructor ()
    {
        this.game = GameInstance.get();

        SceneManagerInstance.set(this);

        AddSceneRenderDataComponent(this.id);

        this.renderData = {
            gameFrame: 0,
            numTotalFrames: 0,
            numDirtyFrames: 0,
            numDirtyCameras: 0,
            scenes: this.scenes
        };

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

        for (const scene of this.scenes.values())
        {
            const worlds = WorldList.get(scene);

            for (const world of worlds)
            {
                world.preRender(gameFrame, dirtyTransforms);
            }
        }

        //  Update all vertices across the whole game, ready for rendering
        UpdateVertexPositionSystem(GameObjectWorld);

        if (this.flush)
        {
            //  Invalidate the renderer cache
            SceneRenderDataComponent.numDirtyFrames[this.id]++;

            //  And reset
            this.flush = false;
        }
    }

    // updateRenderData (world: IBaseWorld, totalFrames: number, dirtyFrames: number, dirtyCameras: number): void
    // {
    //     const id = this.id;

    //     SceneRenderDataComponent.numTotalFrames[id] += totalFrames;
    //     SceneRenderDataComponent.numDirtyFrames[id] += dirtyFrames;
    //     SceneRenderDataComponent.numDirtyCameras[id] += dirtyCameras;
    // }

    getRenderData (): ISceneRenderData
    {
        const id = this.id;

        const data = this.renderData;

        data.gameFrame = SceneRenderDataComponent.gameFrame[id];
        data.numTotalFrames = SceneRenderDataComponent.numTotalFrames[id];
        data.numDirtyFrames = SceneRenderDataComponent.numDirtyFrames[id];
        data.numDirtyCameras = SceneRenderDataComponent.numDirtyCameras[id];

        return data;
    }
}
