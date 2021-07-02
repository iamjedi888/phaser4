import { ITexture } from '../../../textures/ITexture';

export interface IGLTextureBinding
{
    parent: ITexture;

    texture: WebGLTexture;
    framebuffer: WebGLFramebuffer;
    depthbuffer?: WebGLRenderbuffer;

    format: GLenum;
    compressed: boolean;

    isBound: boolean;
    textureUnit: number;

    unpackPremultiplyAlpha: boolean;

    minFilter: GLenum;
    magFilter: GLenum;
    wrapS: GLenum;
    wrapT: GLenum;

    flipY: boolean;
    isPOT: boolean;
    generateMipmap: boolean;

    setFilter (linear: boolean): void;
    create (): WebGLTexture;
    update (): WebGLTexture;
    bind(index: number): void;
    unbind(): void;
    destroy (): void;
}
