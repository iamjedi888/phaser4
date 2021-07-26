import { BindingQueue } from '../BindingQueue';
import { GetBackgroundColor } from '../../config/backgroundcolor/GetBackgroundColor';
import { GetCanvasContext } from '../../config/canvascontext/GetCanvasContext';
import { GetHeight } from '../../config/size/GetHeight';
import { GetResolution } from '../../config/size/GetResolution';
import { GetWidth } from '../../config/size/GetWidth';
import { ICamera } from '../../camera/ICamera';
import { ISceneRenderData } from '../../scenes/ISceneRenderData';
import { SearchEntry } from '../../display/SearchEntryType';

export class CanvasRenderer
{
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    clearColor: string;

    width: number;
    height: number;
    resolution: number;

    textureIndex: number[];
    flushTotal: number;

    clearBeforeRender: boolean = true;
    optimizeRedraw: boolean = true;
    autoResize: boolean = true;

    constructor ()
    {
        this.width = GetWidth();
        this.height = GetHeight();
        this.resolution = GetResolution();

        this.setBackgroundColor(GetBackgroundColor());

        const canvas = document.createElement('canvas');

        this.canvas = canvas;

        this.initContext();
    }

    initContext (): void
    {
        const ctx = this.canvas.getContext('2d', GetCanvasContext());

        // GL.set(gl);

        this.ctx = ctx;

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
            canvas.style.width = (this.width / resolution).toString() + 'px';
            canvas.style.height = (this.height / resolution).toString() + 'px';
        }
    }

    setBackgroundColor (color: number): this
    {
        const r: number = color >> 16 & 0xFF;
        const g: number = color >> 8 & 0xFF;
        const b: number = color & 0xFF;
        const a: number = (color > 16777215) ? color >>> 24 : 255;

        this.clearColor = `rgba(${r}, ${g}, ${b}, ${a})`;

        return this;
    }

    reset (): void
    {
        const ctx = this.ctx;

        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = 'source-over';
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    }

    render (renderData: ISceneRenderData): void
    {
        BindingQueue.clear();

        const ctx = this.ctx;

        //  Nothing dirty? Display the previous frame
        if (this.optimizeRedraw && renderData.numDirtyFrames === 0 && renderData.numDirtyCameras === 0)
        {
            return;
        }

        this.reset();

        if (this.clearBeforeRender)
        {
            ctx.clearRect(0, 0, this.width, this.height);
            ctx.fillStyle = this.clearColor;
            ctx.fillRect(0, 0, this.width, this.height);
        }

        const worlds = renderData.worldData;

        for (let i: number = 0; i < worlds.length; i++)
        {
            const { numRendered, world } = worlds[i];

            const camera = worlds[i].camera as ICamera;

            const { a, b, c, d, tx, ty } = camera.worldTransform;

            ctx.setTransform(a, b, c, d, tx, ty);

            //  Process the render list
            for (let s: number = 0; s < numRendered; s++)
            {
                const entry = world.renderList[s] as SearchEntry;

                entry.node.renderCanvas(this);
                entry.node.postRenderCanvas(this);

                // if (entry.node.isDirty(DIRTY_CONST.PENDING_RENDER))
                // {
                //     entry.node.renderCanvas(this);
                // }
                // else
                // {
                //     entry.node.postRenderCanvas(this);
                // }
            }
        }
    }

    destroy (): void
    {
        //  TODO!
    }
}
