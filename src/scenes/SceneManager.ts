import { Emit, Once } from '../events';

import { AddSceneRenderDataComponent } from './AddSceneRenderDataComponent';
import { Game } from '../Game';
import { GameInstance } from '../GameInstance';
import { GameObjectWorld } from '../GameObjectWorld';
import { GetScenes } from '../config/scenes';
import { IScene } from './IScene';
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

    //  Prepare the render data
    render (gameFrame: number): void
    {
        ResetSceneRenderData(this.id, gameFrame);

        for (const scene of this.scenes.values())
        {
            Emit(scene, 'render');
        }

        if (this.flush)
        {
            //  Invalidate the renderer cache
            SceneRenderDataComponent.numDirtyFrames[this.id]++;

            //  And reset
            this.flush = false;
        }
    }
}
