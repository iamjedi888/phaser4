import { BindShaderEntry } from './BindShaderEntry';
import { ShaderStack } from './ShaderStack';

export function BindDefaultShader (): void
{
    ShaderStack.index = 0;

    BindShaderEntry(ShaderStack.default);
}
