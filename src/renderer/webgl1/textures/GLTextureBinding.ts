import { IGLMipmapType, IGLTextureBindingConfig } from './IGLTextureBindingConfig';

import { CreateFramebuffer } from '../fbo/CreateFramebuffer';
import { CreateGLTexture } from './CreateGLTexture';
import { DeleteFramebuffer } from '../fbo/DeleteFramebuffer';
import { DeleteGLTexture } from './DeleteGLTexture';
import { IGLTextureBinding } from './IGLTextureBinding';
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

    format: string;
    internalFormat: GLenum;
    compressed: boolean;
    mipmaps: IGLMipmapType[];

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

        //  Add option to dump the mipmaps arrays after binding - but prevents context loss restoration

        const {
            mipmaps = null,
            compressed = false,
            format = 'IMG',
            internalFormat = 0,
            texture = null,
            framebuffer = null,
            createFramebuffer = false,
            depthbuffer = null,
            unpackPremultiplyAlpha = true,
            minFilter = (this.isPOT) ? gl.LINEAR_MIPMAP_LINEAR : gl.LINEAR,
            magFilter = gl.LINEAR,
            wrapS = gl.CLAMP_TO_EDGE,
            wrapT = gl.CLAMP_TO_EDGE,
            generateMipmap = this.isPOT,
            flipY = false
        } = config;

        this.compressed = compressed;
        this.format = format;
        this.internalFormat = internalFormat;
        this.mipmaps = mipmaps;

        //  If you don't set minFilter to LINEAR then the compressed textures don't work!
        if (compressed)
        {
            this.minFilter = gl.LINEAR;
        }
        else
        {
            this.minFilter = minFilter;
        }

        this.magFilter = magFilter;
        this.wrapS = wrapS;
        this.wrapT = wrapT;
        this.generateMipmap = generateMipmap;
        this.flipY = flipY;
        this.unpackPremultiplyAlpha = unpackPremultiplyAlpha;

        if (texture)
        {
            this.texture = texture;
        }
        else
        {
            CreateGLTexture(this, mipmaps);
        }

        if (framebuffer)
        {
            this.framebuffer = framebuffer;
        }
        else if (createFramebuffer)
        {
            this.framebuffer = CreateFramebuffer(this.texture);
        }

        if (depthbuffer)
        {
            this.depthbuffer = depthbuffer;
        }

        parent.binding = this;
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
