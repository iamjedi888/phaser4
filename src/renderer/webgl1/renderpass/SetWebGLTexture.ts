import { ClearWebGLTextures } from './ClearWebGLTextures';
import { Flush } from './Flush';
import { ITexture } from '../../../textures/ITexture';
import { TextureStack } from './TextureStack';
import { gl } from '../GL';

//  request the next available texture and bind it
//  returns the new ID

export function SetWebGLTexture <T extends ITexture> (texture: T): number
{
    if (!texture.binding)
    {
        return -1;
    }

    const binding = texture.binding;
    const textures = TextureStack.textures;

    //  Make sure texture isn't already bound
    if (!binding.isBound)
    {
        //  Is the current texture Map full? If so, flush it all
        if (textures.size === TextureStack.maxTextures)
        {
            Flush(TextureStack.renderPass);

            ClearWebGLTextures();
        }

        // Add texture to the map
        const textureUnit = textures.size;

        gl.activeTexture(gl.TEXTURE0 + textureUnit);
        gl.bindTexture(gl.TEXTURE_2D, binding.texture);

        textures.set(textureUnit, texture);

        binding.bind(textureUnit);
    }

    return binding.textureUnit;
}
