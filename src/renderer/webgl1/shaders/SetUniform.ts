import { IShader } from './IShader';

export function SetUniform <T extends IShader> (shader: T, key: string, value: unknown): void
{
    const uniforms = shader.uniforms;

    if (uniforms.has(key))
    {
        uniforms.set(key, value);

        if (shader.isActive)
        {
            const setter = shader.uniformSetters.get(key);

            setter(value);
        }
    }
}
