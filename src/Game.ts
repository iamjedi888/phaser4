import { AddBanner } from './config/banner/AddBanner';
import { AddGlobalVar } from './config/globalvar/AddGlobalVar';
import { AddToParent } from './config/parent/AddToParent';
import { CreateRenderer } from './config/renderer/CreateRenderer';
import { CreateSceneManager } from './scenes/CreateSceneManager';
import { CreateTextureManager } from './textures/CreateTextureManager';
import { CreateWorldRenderData } from './world/CreateWorldRenderData';
import { DOMContentLoaded } from './dom/DOMContentLoaded';
import { Emit } from './events/Emit';
import { EventEmitter } from './events/EventEmitter';
import { GameInstance } from './GameInstance';
import { GameObjectWorld } from './GameObjectWorld';
import { IRenderPass } from './renderer/webgl1/renderpass/IRenderPass';
import { IWorldRenderData } from './world/IWorldRenderData';
import { RendererInstance } from './renderer/RendererInstance';
import { ResetWorldRenderData } from './world/ResetWorldRenderData';
import { SceneManagerInstance } from './scenes';
import { SetConfigDefaults } from './config/SetConfigDefaults';
import { Time } from './components/timer/Time';
import { addEntity } from 'bitecs';

export class Game extends EventEmitter
{
    readonly id: number = addEntity(GameObjectWorld);

    time: Time;

    isBooted: boolean = false;
    isPaused: boolean = false;

    //  TODO - Allow update to run on different tick to render
    //  TODO - Allow update and render to be called directly
    willUpdate: boolean = true;
    willRender: boolean = true;

    renderStats: IWorldRenderData;

    constructor (...settings: { (): void }[])
    {
        super();

        this.time = new Time();

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

        AddBanner();
        AddGlobalVar(this);
        AddToParent();

        this.isBooted = true;
        this.renderStats = CreateWorldRenderData();

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

        this.time.resetLastTick();
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    update (delta: number, time: number): void
    {
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    render (renderPass: IRenderPass, delta: number, time: number): void
    {
    }

    step (now: number): void
    {
        const renderer = RendererInstance.get();
        const sceneManager = SceneManagerInstance.get();

        const time = this.time;

        ResetWorldRenderData(this.renderStats);

        time.update(now);

        if (!this.isPaused)
        {
            const delta = time.delta;

            if (this.willUpdate)
            {
                sceneManager.update();

                this.update(delta, now);

                Emit(this, 'update', delta, now);
            }

            if (this.willRender)
            {
                sceneManager.preRender();

                renderer.begin(sceneManager.flush);

                const renderPass = renderer.renderPass;

                sceneManager.render(renderPass);

                this.render(renderPass, delta, now);

                Emit(this, 'render', renderPass, delta, now);

                renderer.end();
            }
        }

        time.updateDelta(now);

        Emit(this, 'step');

        this.renderStats.fps = time.fps;
        this.renderStats.delta = time.delta;

        requestAnimationFrame(now => this.step(now));
    }

    destroy (): void
    {
        //  TODO - Code destroy function
    }
}
