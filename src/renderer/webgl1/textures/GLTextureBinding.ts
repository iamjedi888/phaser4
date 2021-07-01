import { CreateGLTexture } from './CreateGLTexture';
import { DeleteFramebuffer } from '../fbo/DeleteFramebuffer';
import { DeleteGLTexture } from './DeleteGLTexture';
import { IGLTextureBinding } from './IGLTextureBinding';
import { IGLTextureBindingConfig } from './IGLTextureBindingConfig';
import { ITexture } from '../../../textures/ITexture';
import { IsSizePowerOfTwo } from '../../../math/pow2/IsSizePowerOfTwo';
import { SetGLTextureFilterMode } from './SetGLTextureFilterMode';
import { UpdateGLTexture } from './UpdateGLTexture';
import { gl } from '../GL';

export class GLTextureBinding implements IGLTextureBinding
{
    parent: ITexture;

    texture: WebGLTexture;
    framebuffer: WebGLFramebuffer;
    depthbuffer: WebGLRenderbuffer;

    isBound: boolean = false;
    textureUnit: number = 0;

    unpackPremultiplyAlpha: boolean = true;

    minFilter: GLenum;
    magFilter: GLenum;
    wrapS: GLenum;
    wrapT: GLenum;

    flipY: boolean = false;
    isPOT: boolean = false;
    generateMipmap: boolean = false;

    constructor (parent: ITexture, config: IGLTextureBindingConfig = {})
    {
        this.parent = parent;

        this.isPOT = IsSizePowerOfTwo(parent.width, parent.height);

        const {
            texture = null,
            framebuffer = null,
            depthbuffer = null,
            unpackPremultiplyAlpha = true,
            minFilter = (this.isPOT) ? gl.LINEAR_MIPMAP_LINEAR : gl.LINEAR,
            magFilter = gl.LINEAR,
            wrapS = gl.CLAMP_TO_EDGE,
            wrapT = gl.CLAMP_TO_EDGE,
            generateMipmap = this.isPOT,
            flipY = false
        } = config;

        this.minFilter = minFilter;
        this.magFilter = magFilter;
        this.wrapS = wrapS;
        this.wrapT = wrapT;
        this.generateMipmap = generateMipmap;
        this.flipY = flipY;
        this.unpackPremultiplyAlpha = unpackPremultiplyAlpha;

        if (framebuffer)
        {
            this.framebuffer = framebuffer;
        }

        if (depthbuffer)
        {
            this.depthbuffer = depthbuffer;
        }

        if (texture)
        {
            this.texture = texture;
        }
        else
        {
            CreateGLTexture(this);
        }
    }

    //  Needed?
    setFilter (linear: boolean): void
    {
        if (this.texture)
        {
            SetGLTextureFilterMode(this.texture, linear);
        }
    }

    create (): WebGLTexture
    {
        const texture = this.texture;

        if (texture)
        {
            DeleteGLTexture(texture);
        }

        return CreateGLTexture(this);
    }

    update (): WebGLTexture
    {
        const texture = this.texture;

        if (!texture)
        {
            return CreateGLTexture(this);
        }
        else
        {
            return UpdateGLTexture(this);
        }
    }

    bind (index: number): void
    {
        this.isBound = true;
        this.textureUnit = index;
    }

    unbind (): void
    {
        this.isBound = false;
        this.textureUnit = 0;
    }

    destroy (): void
    {
        this.unbind();

        DeleteGLTexture(this.texture);
        DeleteFramebuffer(this.framebuffer);

        this.parent = null;
        this.texture = null;
        this.framebuffer = null;
    }
}
