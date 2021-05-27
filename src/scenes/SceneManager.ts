import { Emit, Once } from '../events';

import { AddSceneRenderDataComponent } from './AddSceneRenderDataComponent';
import { CreateSceneRenderData } from './CreateSceneRenderData';
import { Game } from '../Game';
import { GameInstance } from '../../GameObjectWorld
import { GameObjectWorld } from '../components/GameObjectWorld';
import { GetScenes } from '../config/scenes';
import { IScene } from './IScene';
import { ISceneRenderData } from './ISceneRenderData';
import { ResetSceneRenderData } from './ResetSceneRenderData';
import { SceneManagerInstance } from './SceneManagerInstance';
import { SceneRenderDataComponent } from './SceneRenderDataComponent';
import { addEntity } from 'bitecs';

export class SceneManager
{
    readonly id: number = addEntity(GameObjectWorld);

    game: Game;

    scenes: Map<string, IScene>  = new Map();

    //  Used by Install to assign default scene keys when not specified
    sceneIndex: number = 0;

    //  Flush the cache
    flush: boolean = false;

    // renderResult: ISceneRenderData = CreateSceneRenderData();

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
            Emit(scene, 'update', delta, time);
        }
    }

    render (gameFrame: number): ISceneRenderData
    {
        // const results = this.renderResult;

        ResetSceneRenderData(this.id, gameFrame);

        for (const scene of this.scenes.values())
        {
            Emit(scene, 'render', results);
        }

        if (this.flush)
        {
            //  Invalidate the renderer cache
            SceneRenderDataComponent.numDirtyFrames[this.id]++;

            //  And reset
            this.flush = false;
        }

        return results;
    }
}
