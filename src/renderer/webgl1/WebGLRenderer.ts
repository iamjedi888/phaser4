import { GetHeight, GetResolution, GetWidth } from '../../config/Size';
import { GetMaxTextures, SetMaxTextures } from '../../config/MaxTextures';

import { BindingQueue } from '../BindingQueue';
import { CheckShaderMaxIfStatements } from './shaders/CheckShaderMaxIfStatements';
import { GL } from './GL';
import { GLTextureBinding } from '../../textures';
import { GetBackgroundColor } from '../../config/BackgroundColor';
import { GetRGBArray } from './colors/GetRGBArray';
import { GetWebGLContext } from '../../config/WebGLContext';
import { IBaseCamera } from '../../camera/IBaseCamera';
import { ISceneRenderData } from '../../scenes/ISceneRenderData';
import { IShader } from './shaders/IShader';
import { ExactEquals as Matrix2dEqual } from '../../math/matrix2d-funcs/ExactEquals';
import { MultiTextureQuadShader } from './shaders/MultiTextureQuadShader';
import { Ortho } from './cameras/Ortho';
import { SingleTextureQuadShader } from './shaders/SingleTextureQuadShader';
import { Texture } from '../../textures/Texture';

export class WebGLRenderer
{
    canvas: HTMLCanvasElement;
    gl: WebGLRenderingContext;

    clearColor = [ 0, 0, 0, 1 ];

    currentShader: IShader;
    shaders: IShader[];

    width: number;
    height: number;
    resolution: number;

    projectionMatrix: Float32Array;
    textureIndex: number[];
    flushTotal: number = 0;

    maxTextures: number = 0;
    activeTextures: Texture[];
    currentActiveTexture: number = 0;
    startActiveTexture: number = 0;
    tempTextures: WebGLTexture[] = [];

    clearBeforeRender: boolean = true;
    optimizeRedraw: boolean = false;
    autoResize: boolean = true;

    contextLost: boolean = false;

    prevCamera: IBaseCamera = null;

    elementIndexExtension: OES_element_index_uint;

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

        this.currentShader = (this.maxTextures === 1) ? new SingleTextureQuadShader() : new MultiTextureQuadShader();

        this.shaders = [ this.currentShader ];
    }

    initContext (): void
    {
        const gl = this.canvas.getContext('webgl', GetWebGLContext());

        GL.set(gl);

        this.gl = gl;

        this.elementIndexExtension = gl.getExtension('OES_element_index_uint');

        this.getMaxTextures();

        gl.disable(gl.DEPTH_TEST);
        gl.disable(gl.CULL_FACE);

        this.resize(this.width, this.height, this.resolution);
    }

    resize (width: number, height: number, resolution: number = 1): void
    {
        this.width = width * resolution;
        this.height = height * resolution;
        this.resolution = resolution;

        const canvas = this.canvas;

        canvas.width = this.width;
        canvas.height = this.height;

        if (this.autoResize)
        {
            canvas.style.width = this.width / resolution + 'px';
            canvas.style.height = this.height / resolution + 'px';
        }

        this.gl.viewport(0, 0, this.width, this.height);

        this.projectionMatrix = Ortho(width, height);
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

    private getMaxTextures (): void
    {
        const gl = this.gl;

        let maxGPUTextures: number = CheckShaderMaxIfStatements(gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS), gl);

        const maxConfigTextures = GetMaxTextures();

        if (maxConfigTextures === 0 || (maxConfigTextures > 0 && maxConfigTextures > maxGPUTextures))
        {
            //  Insert gpu limit into config value
            SetMaxTextures(maxGPUTextures);
        }
        else if (maxConfigTextures > 0 && maxConfigTextures < maxGPUTextures)
        {
            //  Limit to config setting
            maxGPUTextures = maxConfigTextures;
        }

        const tempTextures = this.tempTextures;

        if (tempTextures.length)
        {
            tempTextures.forEach(texture =>
            {
                gl.deleteTexture(texture);
            });
        }

        //  Create temp textures to stop WebGL errors on mac os
        for (let texturesIndex: number = 0; texturesIndex < maxGPUTextures; texturesIndex++)
        {
            const tempTexture = gl.createTexture();

            gl.activeTexture(gl.TEXTURE0 + texturesIndex);

            gl.bindTexture(gl.TEXTURE_2D, tempTexture);

            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([ 0, 0, 255, 255 ]));

            tempTextures[texturesIndex] = tempTexture;
        }

        this.maxTextures = maxGPUTextures;

        this.textureIndex = Array.from(Array(maxGPUTextures).keys());
        this.activeTextures = Array(maxGPUTextures);

        this.currentActiveTexture = 0;
    }

    reset (framebuffer: WebGLFramebuffer = null, width: number = this.width, height: number = this.height): void
    {
        const gl = this.gl;

        gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
        gl.viewport(0, 0, width, height);

        gl.enable(gl.BLEND);
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

        this.currentActiveTexture = 0;
        this.startActiveTexture++;
        this.flushTotal = 0;
    }

    processBindingQueue (): void
    {
        const queue = BindingQueue.get();

        for (let i = 0; i < queue.length; i++)
        {
            const texture = queue[i];

            if (!texture.binding)
            {
                texture.binding = new GLTextureBinding(texture);
            }
        }

        BindingQueue.clear();
    }

    render (renderData: ISceneRenderData): void
    {
        if (this.contextLost)
        {
            return;
        }

        this.processBindingQueue();

        //  This is only here because if we don't do _something_ with the context, GL Spector can't see it.
        //  Technically, we could move it below the dirty bail-out below.
        this.reset();

        //  Cache 1 - Nothing dirty? Display the previous frame
        if (this.optimizeRedraw && renderData.numDirtyFrames === 0 && renderData.numDirtyCameras === 0)
        {
            return;
        }

        const gl = this.gl;

        if (this.clearBeforeRender)
        {
            const cls = this.clearColor;

            gl.clearColor(cls[0], cls[1], cls[2], cls[3]);
            gl.clear(gl.COLOR_BUFFER_BIT);
        }

        const projectionMatrix = this.projectionMatrix;

        //  Cache 2 - Only one dirty camera and one flush? We can re-use the buffers
        /*
        const flushTotal = this.flushTotal;
        if (dirtyCameras === 1 && dirtyFrame === 0 && flushTotal === 1)
        {
            //  Total items rendered in the previous frame
            const count = shader.prevCount;

            shader.bind(projectionMatrix, sceneList[0].matrix);

            shader.draw(count);

            shader.prevCount = count;

            this.flushTotal = 1;

            return;
        }
        */

        this.prevCamera = null;

        const worlds = renderData.worldData;

        for (let i: number = 0; i < worlds.length; i++)
        {
            const { camera, renderList } = worlds[i];

            //  This only needs rebinding if the camera matrix is different to before
            if (!this.prevCamera || !Matrix2dEqual(camera.worldTransform, this.prevCamera.worldTransform))
            {
                this.currentShader.flush(this);

                this.currentShader.bind(this, projectionMatrix, camera.matrix);

                this.prevCamera = camera;
            }

            //  Process the render list
            for (let s: number = 0; s < renderList.length; s++)
            {
                const gameObject = renderList[s];

                if (gameObject.dirty.pendingRender)
                {
                    gameObject.render(this);
                }
                else
                {
                    gameObject.postRender(this);
                }
            }
        }

        //  One final sweep
        this.currentShader.flush(this);
    }

    setShader (newShader: IShader): IShader
    {
        this.currentShader.flush(this);

        this.resetTextures();

        newShader.bind(this, this.projectionMatrix, this.prevCamera.matrix);

        this.shaders.push(newShader);

        this.currentShader = newShader;

        return newShader;
    }

    resetShader (): void
    {
        this.currentShader.flush(this);

        this.resetTextures();

        const shaders = this.shaders;

        if (shaders.length > 1)
        {
            shaders.pop();
        }

        this.currentShader = shaders[shaders.length - 1];

        this.currentShader.bind(this, this.projectionMatrix, this.prevCamera.matrix);
    }

    setFramebuffer (framebuffer: WebGLFramebuffer = null, clear: boolean = false, width?: number, height?: number): void
    {
        this.currentShader.flush(this);

        const gl = this.gl;

        gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);

        if (clear)
        {
            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT);
        }

        if (width)
        {
            gl.viewport(0, 0, width, height);
        }
    }

    resetFramebuffer (): void
    {
        const gl = this.gl;

        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.viewport(0, 0, this.width, this.height);
    }

    resetTextures (texture?: Texture): void
    {
        const gl = this.gl;
        const active = this.activeTextures;

        active.fill(null);

        this.currentActiveTexture = 0;
        this.startActiveTexture++;

        if (texture)
        {
            //  Set this texture as texture0
            active[0] = texture;

            const binding = texture.binding;

            binding.setIndex(0);

            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, binding.texture);

            this.currentActiveTexture = 1;
        }
    }

    requestTexture (texture: Texture): void
    {
        const gl = this.gl;
        const binding = texture.binding;

        binding.indexCounter = this.startActiveTexture;

        if (this.currentActiveTexture < this.currentShader.maxTextures)
        {
            //  Make this texture active
            this.activeTextures[this.currentActiveTexture] = texture;

            binding.setIndex(this.currentActiveTexture);

            gl.activeTexture(gl.TEXTURE0 + this.currentActiveTexture);
            gl.bindTexture(gl.TEXTURE_2D, binding.texture);

            this.currentActiveTexture++;
        }
        else
        {
            //  We're out of textures, so flush the batch and reset them all
            this.currentShader.flush(this);

            this.resetTextures(texture);
        }
    }
}
