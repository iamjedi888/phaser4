import { IRenderPass } from '../renderpass/IRenderPass';
import { IShader } from './IShader';
import { SetUniforms } from './SetUniforms';

export function BindShader <T extends IShader> (shader: T, renderPass: IRenderPass): boolean
{
    const uniforms = shader.uniforms;

    uniforms.set('uProjectionMatrix', renderPass.projectionMatrix);
    uniforms.set('uCameraMatrix', renderPass.cameraMatrix);

    shader.updateUniforms(renderPass);

    return SetUniforms(shader, renderPass);
}
