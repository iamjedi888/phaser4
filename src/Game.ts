import { AddTimeComponent } from './components/timer/AddTimeComponent';
import { AddToDOM } from './dom/AddToDOM';
import { DOMContentLoaded } from './dom/DOMContentLoaded';
import { Emit } from './events/Emit';
import { EventEmitter } from './events/EventEmitter';
import { GameInstance } from './GameInstance';
import { GameObjectWorld } from './GameObjectWorld';
import { GetBanner } from './config/banner/GetBanner';
import { GetGlobalVar } from './config/globalvar/GetGlobalVar';
import { GetParent } from './config/parent/GetParent';
import { GetRenderStatsAsObject } from './scenes/GetRenderStatsAsObject';
import { GetRenderer } from './config/renderer/GetRenderer';
import { IRenderPass } from './renderer/webgl1/renderpass/IRenderPass';
import { IRenderStats } from './scenes/IRenderStats';
import { IRenderer } from './renderer/IRenderer';
import { SceneManager } from './scenes/SceneManager';
import { SetConfigDefaults } from './config/SetConfigDefaults';
import { TextureManager } from './textures/TextureManager';
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

    renderer: IRenderer;
    textureManager: TextureManager;
    sceneManager: SceneManager;

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

        const renderer = GetRenderer();

        this.textureManager = new TextureManager();
        this.renderer = new renderer();
        this.sceneManager = new SceneManager();

        //  Only add to the DOM if they either didn't set a Parent, or expressly set it to be non-null
        //  Otherwise we'll let them add the canvas to the DOM themselves
        const parent = GetParent();

        if (parent)
        {
            AddToDOM(this.renderer.canvas, parent);
        }

        const globalVar = GetGlobalVar();

        if (globalVar && window)
        {
            (window as unknown)[globalVar] = this;
        }

        this.isBooted = true;

        GetBanner();

        AddTimeComponent(this.id);

        this.renderStats = GetRenderStatsAsObject();

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

        TimeComponent.lastTick[this.id] = performance.now();
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
        const renderer = this.renderer;
        const sceneManager = this.sceneManager;

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
                renderer.renderBegin(sceneManager.flush);

                sceneManager.preRender();

                renderer.renderScenes(sceneManager.scenes);

                this.render(renderer.renderPass, delta, time);

                Emit(this, 'render', renderer.renderPass, delta, time);

                renderer.renderEnd();

                sceneManager.flush = false;
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
