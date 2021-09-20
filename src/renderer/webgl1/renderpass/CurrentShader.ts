import { ShaderStack } from './ShaderStack';
import { ShaderStackEntry } from './ShaderStackEntry';

export function CurrentShader (): ShaderStackEntry
{
    return ShaderStack.stack[ShaderStack.index];
}
