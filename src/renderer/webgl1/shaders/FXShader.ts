import { BindShader } from './BindShader';
import { DefaultQuadAttributes } from './DefaultQuadAttributes';
import { IFXShaderConfig } from './IFXShaderConfig';
import { IRenderPass } from '../renderpass/IRenderPass';
import { IShader } from './IShader';
import { Shader } from './Shader';

//  A Quad Shader with built in time and resolution uniforms.
//  It will automatically look for uniforms called "uTime" and "uResolution"
//  and if it doesn't find those, it will look for "time" and "resolution".
//  If you use other uniform names then pass them in the config object.

export class FXShader extends Shader implements IShader
{
    private timeVar: string;
    private resolutionVar: string;

    timeScale: number;

    constructor (config: IFXShaderConfig = {})
    {
        config.attributes = config?.attributes || DefaultQuadAttributes;

        config.renderToFramebuffer = true;

        super(config);

        const {
            timeUniform = 'uTime',
            resolutionUniform = 'uResolution',
            timeScale = 0.001
        } = config;

        const uniforms = [ ... this.uniformSetters.keys() ];

        this.timeVar = uniforms.includes(timeUniform) ? timeUniform : 'time';
        this.resolutionVar = uniforms.includes(resolutionUniform) ? resolutionUniform : 'resolution';

        if (!uniforms.includes(this.timeVar))
        {
            this.timeVar = undefined;
        }

        if (!uniforms.includes(this.resolutionVar))
        {
            this.resolutionVar = undefined;
        }

        this.timeScale = timeScale;
    }

    bind (renderPass: IRenderPass): boolean
    {
        const timeVar = this.timeVar;
        const resolutionVar = this.resolutionVar;

        if (timeVar)
        {
            this.uniforms.set(timeVar, performance.now() * this.timeScale);
        }

        if (resolutionVar)
        {
            const renderer = renderPass.renderer;

            this.uniforms.set(resolutionVar, [ renderer.width, renderer.height ]);
        }

        return BindShader(this, renderPass);
    }
}
