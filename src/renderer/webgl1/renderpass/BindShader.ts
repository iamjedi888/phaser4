import { IRenderPass } from './IRenderPass';
import { ShaderStackEntry } from '../shaders/ShaderStackEntry';

export function BindShader (renderPass: IRenderPass, entry?: ShaderStackEntry): void
{
    let prevShader;

    if (!entry)
    {
        entry = renderPass.currentShader;
    }
    else
    {
        prevShader = renderPass.currentShader.shader;
    }

    if (!entry.shader.isActive)
    {
        const success = entry.shader.bind(renderPass, entry.textureID);

        if (success)
        {
            entry.shader.setAttributes(renderPass);

            if (prevShader && prevShader !== entry.shader)
            {
                prevShader.isActive = false;
            }
        }
    }
}
