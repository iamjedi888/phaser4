import { DefaultQuadAttributes } from './DefaultQuadAttributes';
import { IFXShaderConfig } from './IFXShaderConfig';
import { IRenderPass } from '../renderpass/IRenderPass';
import { IShader } from './IShader';
import { QuadShader } from './QuadShader';

//  A Quad Shader with built in time and resolution uniforms.
//  It will automatically look for uniforms called "Uime" and "uResolution"
//  and if it doesn't find those, it will look for "time" and "resolution".
//  If you use other uniform names then pass them in the config object.

export class FXShader extends QuadShader implements IShader
{
    private timeVar: string;
    private resolutionVar: string;

    timeScale: number = 1;

    constructor (config: IFXShaderConfig = {})
    {
        config.attributes = config?.attributes || DefaultQuadAttributes;

        config.renderToFramebuffer = true;

        super(config);

        const {
            timeUniform = 'uTime',
            resolutionUniform = 'uResolution'
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
    }

    bind (renderPass: IRenderPass): boolean
    {
        const renderer = renderPass.renderer;

        if (this.timeVar)
        {
            this.uniforms.set(this.timeVar, performance.now() * this.timeScale);
        }

        if (this.resolutionVar)
        {
            this.uniforms.set(this.resolutionVar, [ renderer.width, renderer.height ]);
        }

        return super.bind(renderPass);
    }
}
