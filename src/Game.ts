import { AddToDOM, DOMContentLoaded } from './dom';
import { Emit, EventEmitter } from './events';

import { GameInstance } from './GameInstance';
import { GameObjectWorld } from './GameObjectWorld';
import { GetBanner } from './config/banner';
import { GetGlobalVar } from './config/globalvar';
import { GetParent } from './config/parent';
import { GetRenderStatsAsObject } from './scenes';
import { GetRenderer } from './config/renderer';
import { IRenderStats } from './scenes/IRenderStats';
import { IRenderer } from './renderer/IRenderer';
import { PackQuadColorsSystem } from './components/color';
import { SceneManager } from './scenes/SceneManager';
import { SetConfigDefaults } from './config/SetConfigDefaults';
import { TextureManager } from './textures/TextureManager';
import { addEntity } from 'bitecs';

export class Game extends EventEmitter
{
    readonly id: number = addEntity(GameObjectWorld);

    readonly VERSION: string = '4.0.0-beta1';

    //  TODO - Consider moving all of these to RenderStats Component
    isBooted: boolean = false;
    isPaused: boolean = false;

    //  TODO - Allow update to run on different tick to render
    //  TODO - Allow update and render to be called directly
    willUpdate: boolean = true;
    willRender: boolean = true;

    lastTick: number = 0;
    elapsed: number = 0;
    delta: number = 0;
    fps: number = 0;
    frame: number = 0;
    framems: number = 0;

    private frames: number = 0;
    private prevFrame: number = 0;

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

        const now = performance.now();

        this.lastTick = now;
        this.prevFrame = now;

        this.renderStats = GetRenderStatsAsObject();

        Emit(this, 'boot');

        this.step(now);
    }

    pause (): void
    {
        this.isPaused = true;
    }

    resume (): void
    {
        this.isPaused = false;

        this.lastTick = performance.now();
    }

    step (time: number): void
    {
        const renderer = this.renderer;
        const sceneManager = this.sceneManager;

        this.framems = time - this.lastTick;

        if (!this.isPaused)
        {
            if (this.willUpdate)
            {
                sceneManager.update(this.delta, time, this.frame);

                Emit(this, 'update', this.framems, time);
            }

            if (this.willRender)
            {
                renderer.renderBegin(sceneManager.flush);

                sceneManager.preRender(this.frame);

                renderer.renderScenes(sceneManager.scenes);

                PackQuadColorsSystem(GameObjectWorld);

                Emit(this, 'render', renderer.renderPass, this.framems, time);

                renderer.renderEnd();

                sceneManager.flush = false;
            }
        }

        //  Note that privacy.resistFingerprinting can round this value to 100ms or more!
        const now = performance.now();

        //  How long it took to process this frame
        const delta = now - time;

        this.frames++;

        if (now >= this.prevFrame + 1000)
        {
            this.fps = (this.frames * 1000) / (now - this.prevFrame);
            this.prevFrame = now;
            this.frames = 0;
        }

        this.lastTick = now;
        this.elapsed += delta;
        this.delta = delta;

        GetRenderStatsAsObject(this.renderStats);

        this.renderStats.fps = this.fps;
        this.renderStats.delta = delta;

        Emit(this, 'step');

        //  The frame always advances by 1 each step (even when paused)
        this.frame++;

        GameInstance.setFrame(this.frame);
        GameInstance.setElapsed(this.elapsed);

        requestAnimationFrame(now => this.step(now));
    }

    destroy (): void
    {
        //  TODO - Code destroy function
    }
}
