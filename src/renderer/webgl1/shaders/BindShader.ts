import { IRenderPass } from '../renderpass/IRenderPass';
import { IShader } from './IShader';

export function BindShader <T extends IShader> (shader: T, renderPass: IRenderPass): boolean
{
    const uniforms = shader.uniforms;

    uniforms.set('uProjectionMatrix', renderPass.projectionMatrix);
    uniforms.set('uCameraMatrix', renderPass.cameraMatrix);

    // this.updateUniforms(renderPass);

    // return this.setUniforms(renderPass);

    return true;
}
