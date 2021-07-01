export interface IGLTextureBindingConfig
{
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
