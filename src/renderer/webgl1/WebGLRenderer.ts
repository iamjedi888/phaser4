import { GetHeight, GetResolution, GetWidth } from '../../config/size/';

import { End } from './renderpass/End';
import { GL } from './GL';
import { GetBackgroundColor } from '../../config/backgroundcolor/GetBackgroundColor';
import { GetRGBArray } from './colors/GetRGBArray';
import { GetWebGLContext } from '../../config/webglcontext/GetWebGLContext';
import { IRenderPass } from './renderpass/IRenderPass';
import { IScene } from '../../scenes/IScene';
import { ProcessBindingQueue } from './renderpass/ProcessBindingQueue';
import { RenderPass } from './renderpass/RenderPass';
import { Start } from './renderpass';
import { WebGLRendererInstance } from './WebGLRendererInstance';
import { WorldList } from '../../world/WorldList';

export class WebGLRenderer
{
    canvas: HTMLCanvasElement;
    gl: WebGLRenderingContext;

    renderPass: IRenderPass;

    clearColor = [ 0, 0, 0, 1 ];

    width: number;
    height: number;
    resolution: number;

    clearBeforeRender: boolean = true;
    optimizeRedraw: boolean = true;
    autoResize: boolean = true;

    contextLost: boolean = false;

    constructor ()
    {
        this.width = GetWidth();
        this.height = GetHeight();
        this.resolution = GetResolution();

        this.setBackgroundColor(GetBackgroundColor());

        const canvas = document.createElement('canvas');

        canvas.addEventListener('webglcontextlost', (event) => this.onContextLost(event), false);
        canvas.addEventListener('webglcontextrestored', () => this.onContextRestored(), false);

        this.canvas = canvas;

        this.initContext();

        //  By this stage the context is available
        WebGLRendererInstance.set(this);

        this.renderPass = new RenderPass(this);

        this.resize(this.width, this.height, this.resolution);
    }

    initContext (): void
    {
        const gl = this.canvas.getContext('webgl', GetWebGLContext());

        GL.set(gl);

        this.gl = gl;

        gl.disable(gl.DEPTH_TEST);
        gl.disable(gl.CULL_FACE);
    }

    resize (width: number, height: number, resolution: number = 1): void
    {
        const calcWidth = width * resolution;
        const calcHeight = height * resolution;

        this.width = calcWidth;
        this.height = calcHeight;
        this.resolution = resolution;

        const canvas = this.canvas;

        canvas.width = calcWidth;
        canvas.height = calcHeight;

        if (this.autoResize)
        {
            canvas.style.width = width.toString() + 'px';
            canvas.style.height = height.toString() + 'px';
        }

        this.renderPass.resize(calcWidth, calcHeight);
    }

    onContextLost (event: Event): void
    {
        event.preventDefault();

        this.contextLost = true;
    }

    onContextRestored (): void
    {
        this.contextLost = false;

        this.initContext();
    }

    setBackgroundColor (color: number): this
    {
        GetRGBArray(color, this.clearColor);

        return this;
    }

    //  TODO - Remove?
    reset (): void
    {
        // this.renderPass.reset();
    }

    render (willRedraw: boolean, scenes: Map<string, IScene>): void
    {
        if (this.contextLost)
        {
            return;
        }

        const gl = this.gl;
        const renderPass = this.renderPass;

        //  This is only here because if we don't do _something_ with the context,
        //  GL Spector can't see it!
        gl.getContextAttributes();

        ProcessBindingQueue();

        //  Nothing dirty? Display the previous frame
        if (this.optimizeRedraw && !willRedraw)
        {
            // return;
        }

        if (this.clearBeforeRender)
        {
            const cls = this.clearColor;

            gl.clearColor(cls[0], cls[1], cls[2], cls[3]);
            gl.clear(gl.COLOR_BUFFER_BIT);
        }

        Start(renderPass);

        for (const scene of scenes.values())
        {
            const worlds = WorldList.get(scene);

            for (const world of worlds)
            {
                if (world.runRender)
                {
                    world.renderGL(renderPass);

                    //  Stats sweep

                    world.postRenderGL(renderPass);
                }
            }
        }

        End(renderPass);

        // eslint-disable-next-line no-debugger
        // debugger;
    }

    destroy (): void
    {
        WebGLRendererInstance.set(undefined);
    }
}
