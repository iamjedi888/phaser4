import { ITexture } from '../../../textures/ITexture';
import { gl } from '../GL';

//  Directly bind a texture to an index slot
export function BindTexture <T extends ITexture> (texture: T, index: number = 1): void
{
    const binding = texture.binding;

    binding.bind(index);

    gl.activeTexture(gl.TEXTURE0 + index);
    gl.bindTexture(gl.TEXTURE_2D, binding.texture);
}
