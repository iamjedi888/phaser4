import { IGLTextureBinding } from './IGLTextureBinding';
import { SetWebGLTexture } from '../renderpass/SetWebGLTexture';
import { UnbindTexture } from '../renderpass/UnbindTexture';
import { gl } from '../GL';

export function UpdateGLTexture <T extends IGLTextureBinding> (binding: T): WebGLTexture
{
    const parent = binding.parent;
    const source = parent.image;
    const width = source.width;
    const height = source.height;

    if (width > 0 && height > 0)
    {
        SetWebGLTexture(parent);

        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, binding.flipY);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);

        UnbindTexture(parent);
    }

    return binding.texture;
}
