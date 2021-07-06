import { IGLTextureBinding } from './IGLTextureBinding';
import { gl } from '../GL';

export function CreateGLTexture <T extends IGLTextureBinding> (binding: T, data?: Uint8Array[]): WebGLTexture
{
    const { generateMipmap, minFilter, parent, compressed, internalFormat, flipY, unpackPremultiplyAlpha, magFilter, wrapS, wrapT, isPOT } = binding;

    const source = parent.image;

    let width = parent.width;
    let height = parent.height;

    const glTexture: WebGLTexture = gl.createTexture();

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, glTexture);

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flipY);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, unpackPremultiplyAlpha);

    if (source)
    {
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);

        width = source.width;
        height = source.height;
    }
    else if (compressed && data)
    {
        for (let i = 0; i < data.length; i++)
        {
            gl.compressedTexImage2D(gl.TEXTURE_2D, i, internalFormat, width, height, 0, data[i]);
        }
    }
    else
    {
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    }

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, minFilter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, magFilter);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrapS);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrapT);

    if (generateMipmap && isPOT)
    {
        gl.generateMipmap(gl.TEXTURE_2D);
    }

    binding.texture = glTexture;

    return glTexture;
}
