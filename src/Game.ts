import { AddBanner } from './config/banner/AddBanner';
import { AddGlobalVar } from './config/globalvar/AddGlobalVar';
import { AddTimeComponent } from './components/timer/AddTimeComponent';
import { AddToParent } from './config/parent/AddToParent';
import { CreateRenderer } from './config/renderer/CreateRenderer';
import { CreateSceneManager } from './scenes/CreateSceneManager';
import { CreateTextureManager } from './textures/CreateTextureManager';
import { DOMContentLoaded } from './dom/DOMContentLoaded';
import { Emit } from './events/Emit';
import { EventEmitter } from './events/EventEmitter';
import { GameInstance } from './GameInstance';
import { GameObjectWorld } from './GameObjectWorld';
import { GetRenderStatsAsObject } from './scenes/GetRenderStatsAsObject';
import { IRenderPass } from './renderer/webgl1/renderpass/IRenderPass';
import { IRenderStats } from './scenes/IRenderStats';
import { RendererInstance } from './renderer/RendererInstance';
import { ResetLastTick } from './components/timer/ResetLastTick';
import { SceneManagerInstance } from './scenes';
import { SetConfigDefaults } from './config/SetConfigDefaults';
import { TimeComponent } from './components/timer/TimeComponent';
import { UpdateDelta } from './components/timer/UpdateDelta';
import { UpdateTime } from './components/timer/UpdateTime';
import { addEntity } from 'bitecs';

export class Game extends EventEmitter
{
    readonly id: number = addEntity(GameObjectWorld);

    readonly VERSION: string = '4.0.0-beta1';

    isBooted: boolean = false;
    isPaused: boolean = false;

    //  TODO - Allow update to run on different tick to render
    //  TODO - Allow update and render to be called directly
    willUpdate: boolean = true;
    willRender: boolean = true;

    renderStats: IRenderStats;

    constructor (...settings: { (): void }[])
    {
        super();

        GameInstance.set(this);

        SetConfigDefaults();

        DOMContentLoaded(() => this.boot(settings));
    }

    boot (settings: { (): void }[]): void
    {
        //  Activate the settings post DOM Content Loaded
        settings.forEach(setting => setting());

        CreateRenderer();
        CreateTextureManager();
        CreateSceneManager();

        AddTimeComponent(this.id);
        AddBanner();
        AddGlobalVar(this);
        AddToParent();

        this.renderStats = GetRenderStatsAsObject();

        this.isBooted = true;

        Emit(this, 'boot');

        requestAnimationFrame(now => this.step(now));
    }

    pause (): void
    {
        this.isPaused = true;
    }

    resume (): void
    {
        this.isPaused = false;

        ResetLastTick(this.id);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    update (delta: number, time: number): void
    {
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    render (renderPass: IRenderPass, delta: number, time: number): void
    {
    }

    step (time: number): void
    {
        const id = this.id;
        const renderer = RendererInstance.get();
        const sceneManager = SceneManagerInstance.get();

        UpdateTime(id, time);

        if (!this.isPaused)
        {
            const delta = TimeComponent.delta[id];

            if (this.willUpdate)
            {
                sceneManager.update();

                this.update(delta, time);

                Emit(this, 'update', delta, time);
            }

            if (this.willRender)
            {
                sceneManager.preRender();

                renderer.begin(sceneManager.flush);

                sceneManager.render(renderer.renderPass);

                this.render(renderer.renderPass, delta, time);

                Emit(this, 'render', renderer.renderPass, delta, time);

                renderer.end();
            }
        }

        UpdateDelta(id, time);

        GetRenderStatsAsObject(this.renderStats);

        this.renderStats.fps = TimeComponent.fps[id];
        this.renderStats.delta = TimeComponent.delta[id];

        Emit(this, 'step');

        requestAnimationFrame(now => this.step(now));
    }

    destroy (): void
    {
        //  TODO - Code destroy function
    }
}
