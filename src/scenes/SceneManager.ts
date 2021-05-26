import { Emit, Once } from '../events';

import { CreateSceneRenderData } from './CreateSceneRenderData';
import { Game } from '../Game';
import { GameInstance } from '../GameInstance';
import { GameObjectWorld } from '../components/GameObjectWorld';
import { GetScenes } from '../config/scenes';
import { IScene } from './IScene';
import { ISceneRenderData } from './ISceneRenderData';
import { ResetSceneRenderData } from './ResetSceneRenderData';
import { SceneManagerInstance } from './SceneManagerInstance';
import { UpdateLocalTransform2DSystem } from '../components/transform/UpdateLocalTransform2DSystem';

export class SceneManager
{
    game: Game;

    scenes: Map<string, IScene>  = new Map();

    //  Used by Install to assign default scene keys when not specified
    sceneIndex: number = 0;

    //  Flush the cache
    flush: boolean = false;

    renderResult: ISceneRenderData = CreateSceneRenderData();

    constructor ()
    {
        this.game = GameInstance.get();

        SceneManagerInstance.set(this);

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
            Emit(scene, 'update', delta, time);
        }
    }

    render (gameFrame: number): ISceneRenderData
    {
        const results = this.renderResult;

        ResetSceneRenderData(results, gameFrame);

        //  Go through and update all dirty LocalTransforms in all Worlds
        UpdateLocalTransform2DSystem(GameObjectWorld);

        for (const scene of this.scenes.values())
        {
            Emit(scene, 'render', results);
        }

        if (this.flush)
        {
            //  Invalidate the renderer cache
            results.numDirtyFrames++;

            //  And reset
            this.flush = false;
        }

        return results;
    }
}
