export interface IGLTextureBindingConfig
{
    data?: Uint8Array;
    format?: string;
    internalFormat?: GLenum;
    compressed?: boolean;
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
