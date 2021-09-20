import { ITexture } from '../../../textures/ITexture';
import { TextureStack } from './TextureStack';
import { gl } from '../GL';

export function UnbindTexture <T extends ITexture> (texture: T): void
{
    const index = texture.binding.textureUnit;

    const binding = texture.binding;

    binding.unbind();

    gl.activeTexture(gl.TEXTURE0 + index);
    gl.bindTexture(gl.TEXTURE_2D, TextureStack.tempTextures.get(index));
}
