import { IGLTextureBinding } from './IGLTextureBinding';
import { gl } from '../GL';

export function CreateGLTexture <T extends IGLTextureBinding> (binding: T, data?: Uint8Array): WebGLTexture
{
    const { parent, compressed, format, flipY, unpackPremultiplyAlpha, minFilter, magFilter, wrapS, wrapT, generateMipmap, isPOT } = binding;

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
    else if (compressed)
    {
        // void gl.compressedTexImage2D(target, level, internalformat, width, height, border, ArrayBufferView? pixels);

        // https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/compressedTexImage2D

        const formats = {
            COMPRESSED_RGB_S3TC_DXT1_EXT: 0x83F0,
            COMPRESSED_RGBA_S3TC_DXT1_EXT: 0x83F1,
            COMPRESSED_RGBA_S3TC_DXT3_EXT: 0x83F2,
            COMPRESSED_RGBA_S3TC_DXT5_EXT: 0x83F3,

            COMPRESSED_RGB_PVRTC_4BPPV1_IMG: 0x8C00,
            COMPRESSED_RGB_PVRTC_2BPPV1_IMG: 0x8C01,
            COMPRESSED_RGBA_PVRTC_4BPPV1_IMG: 0x8C02,
            COMPRESSED_RGBA_PVRTC_2BPPV1_IMG: 0x8C03
        };

        gl.compressedTexImage2D(gl.TEXTURE_2D, 0, formats[ format ], width, height, 0, data);
    }
    else
    {
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    }

    //  Could we use https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/texSubImage2D instead?
    //  Then it may allow for wrapping, repeating, etc on a sub-image

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
