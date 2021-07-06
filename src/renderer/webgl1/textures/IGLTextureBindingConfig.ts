export interface IGLTextureBindingConfig
{
    format?: string;
    internalFormat?: GLenum;
    compressed?: boolean;
    mipmaps?: Uint8Array[];

    width?: number;
    height?: number;

    texture?: WebGLTexture;
    framebuffer?: WebGLFramebuffer;
    depthbuffer?: WebGLRenderbuffer;

    createFramebuffer?: boolean;
    unpackPremultiplyAlpha?: boolean;

    minFilter?: GLenum;
    magFilter?: GLenum;

    wrapS?: GLenum;
    wrapT?: GLenum;

    flipY?: boolean;
    generateMipmap?: boolean;
}
