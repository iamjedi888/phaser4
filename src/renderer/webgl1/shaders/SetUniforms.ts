import { IRenderPass } from '../renderpass/IRenderPass';
import { IShader } from './IShader';
import { gl } from '../GL';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function SetUniforms <T extends IShader> (shader: T, renderPass: IRenderPass): boolean
{
    if (!shader.program)
    {
        return false;
    }

    gl.useProgram(shader.program);

    shader.isActive = true;

    const uniforms = shader.uniforms;

    for (const [ name, setter ] of shader.uniformSetters.entries())
    {
        setter(uniforms.get(name));
    }

    return true;
}
