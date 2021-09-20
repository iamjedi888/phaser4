import { BindShaderEntry } from './BindShaderEntry';
import { ShaderStack } from './ShaderStack';

export function PopShader (): void
{
    ShaderStack.index--;

    BindShaderEntry();
}
