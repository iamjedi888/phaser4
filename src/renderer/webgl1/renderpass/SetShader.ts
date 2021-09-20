import { AddShader } from './AddShader';
import { BindShaderEntry } from './BindShaderEntry';
import { IShader } from '../shaders/IShader';

export function SetShader <T extends IShader> (shader: T, textureID?: number): void
{
    const entry = AddShader(shader, textureID);

    BindShaderEntry(entry);
}
