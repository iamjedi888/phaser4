import { IShader } from '../shaders/IShader';
import { ShaderStack } from './ShaderStack';

export function SetDefaultShader <T extends IShader> (shader: T, textureID?: number): void
{
    const entry = { shader, textureID };

    //  The default entry always goes into index zero
    ShaderStack.stack[0] = entry;

    ShaderStack.index = 0;

    ShaderStack.default = entry;
}
