import {CreateGLTexture} from "./CreateGLTexture";
import {DeleteFramebuffer} from "../fbo/DeleteFramebuffer";
import {DeleteGLTexture} from "./DeleteGLTexture";
import {IsSizePowerOfTwo} from "../../../math/pow2/IsSizePowerOfTwo";
import {SetGLTextureFilterMode} from "./SetGLTextureFilterMode";
import {UpdateGLTexture} from "./UpdateGLTexture";
import {gl} from "../GL";
export class GLTextureBinding {
  constructor(parent, config = {}) {
    this.index = 0;
    this.indexCounter = -1;
    this.dirtyIndex = true;
    this.unpackPremultiplyAlpha = true;
    this.flipY = false;
    this.isPOT = false;
    this.generateMipmap = false;
    this.parent = parent;
    this.isPOT = IsSizePowerOfTwo(parent.width, parent.height);
    const {
      texture = null,
      framebuffer = null,
      depthbuffer = null,
      unpackPremultiplyAlpha = true,
      minFilter = this.isPOT ? gl.LINEAR_MIPMAP_LINEAR : gl.LINEAR,
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
    if (framebuffer) {
      this.framebuffer = framebuffer;
    }
    if (depthbuffer) {
      this.depthbuffer = depthbuffer;
    }
    if (texture) {
      this.texture = texture;
    } else {
      CreateGLTexture(this);
    }
  }
  setFilter(linear) {
    if (this.texture) {
      SetGLTextureFilterMode(this.texture, linear);
    }
  }
  create() {
    const texture = this.texture;
    if (texture) {
      DeleteGLTexture(texture);
    }
    return CreateGLTexture(this);
  }
  update() {
    const texture = this.texture;
    if (!texture) {
      return CreateGLTexture(this);
    } else {
      return UpdateGLTexture(this);
    }
  }
  setIndex(index) {
    this.dirtyIndex = index !== this.index;
    this.index = index;
  }
  destroy() {
    DeleteGLTexture(this.texture);
    DeleteFramebuffer(this.framebuffer);
    this.parent = null;
    this.texture = null;
    this.framebuffer = null;
  }
}
