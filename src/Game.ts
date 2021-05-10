import { AddToDOM, DOMContentLoaded } from './dom';
import { Emit, EventEmitter } from './events';

import { GameInstance } from './GameInstance';
import { GetBanner } from './config/banner';
import { GetGlobalVar } from './config/globalvar';
import { GetParent } from './config/parent';
import { GetRenderer } from './config/renderer';
import { IRenderer } from './renderer/IRenderer';
import { SceneManager } from './scenes/SceneManager';
import { SetConfigDefaults } from './config/SetConfigDefaults';
import { TextureManager } from './textures/TextureManager';

export class Game extends EventEmitter
{
    readonly VERSION: string = '4.0.0-beta1';

    isBooted: boolean = false;
    isPaused: boolean = false;

    willUpdate: boolean = true;
    willRender: boolean = true;

    lastTick: number = 0;
    elapsed: number = 0;

    //  The current game frame
    frame: number = 0;

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

        this.renderer = new renderer();
        this.textureManager = new TextureManager();
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

        Emit(this, 'boot');

        this.lastTick = performance.now();

        this.step(this.lastTick);
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
        //  Note that privacy.resistFingerprinting can round this value to 100ms or more!
        const delta = time - this.lastTick;

        this.lastTick = time;
        this.elapsed += delta;

        if (!this.isPaused)
        {
            if (this.willUpdate)
            {
                this.sceneManager.update(delta, time);

                Emit(this, 'update', delta, time);
            }

            if (this.willRender)
            {
                this.renderer.render(this.sceneManager.render(this.frame));
            }
        }

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
