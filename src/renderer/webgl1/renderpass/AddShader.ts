import { IShader } from '../shaders/IShader';
import { ShaderStack } from './ShaderStack';
import { ShaderStackEntry } from './ShaderStackEntry';

export function AddShader <T extends IShader> (shader: T, textureID?: number): ShaderStackEntry
{
    const entry = { shader, textureID };

    ShaderStack.index++;

    //  cursor already at the end of the stack, so we need to grow it
    if (ShaderStack.index === ShaderStack.stack.length)
    {
        ShaderStack.stack.push(entry);
    }
    else
    {
        ShaderStack.stack[ShaderStack.index] = entry;
    }

    return entry;
}
