import { DefaultQuadAttributes } from './DefaultQuadAttributes';
import { IRenderPass } from '../renderpass/IRenderPass';
import { IShader } from './IShader';
import { IShaderConfig } from './IShaderConfig';
import { Shader } from './Shader';

export class QuadShader extends Shader implements IShader
{
    constructor (config: IShaderConfig = {})
    {
        config.attributes = config?.attributes || DefaultQuadAttributes;

        super(config);
    }

    bind (renderPass: IRenderPass): boolean
    {
        const uniforms = this.uniforms;

        uniforms.set('uProjectionMatrix', renderPass.projectionMatrix.data);
        uniforms.set('uCameraMatrix', renderPass.cameraMatrix.data);

        return super.bind(renderPass);
    }
}
