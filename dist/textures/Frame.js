export class Frame {
  constructor(texture, key, x, y, width, height) {
    this.trimmed = false;
    this.texture = texture;
    this.key = key;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.sourceSizeWidth = width;
    this.sourceSizeHeight = height;
    this.updateUVs();
  }
  setPivot(x, y) {
    this.pivot = {x, y};
  }
  setSize(width, height) {
    this.width = width;
    this.height = height;
    this.sourceSizeWidth = width;
    this.sourceSizeHeight = height;
    this.updateUVs();
  }
  setSourceSize(width, height) {
    this.sourceSizeWidth = width;
    this.sourceSizeHeight = height;
  }
  setTrim(width, height, x, y, w, h) {
    this.trimmed = true;
    this.sourceSizeWidth = width;
    this.sourceSizeHeight = height;
    this.spriteSourceSizeX = x;
    this.spriteSourceSizeY = y;
    this.spriteSourceSizeWidth = w;
    this.spriteSourceSizeHeight = h;
  }
  getExtent(originX, originY) {
    const sourceSizeWidth = this.sourceSizeWidth;
    const sourceSizeHeight = this.sourceSizeHeight;
    let left;
    let right;
    let top;
    let bottom;
    if (this.trimmed) {
      left = this.spriteSourceSizeX - originX * sourceSizeWidth;
      right = left + this.spriteSourceSizeWidth;
      top = this.spriteSourceSizeY - originY * sourceSizeHeight;
      bottom = top + this.spriteSourceSizeHeight;
    } else {
      left = -originX * sourceSizeWidth;
      right = left + sourceSizeWidth;
      top = -originY * sourceSizeHeight;
      bottom = top + sourceSizeHeight;
    }
    return {left, right, top, bottom};
  }
  copyToExtent(child) {
    const transform = child.transform;
    const originX = transform.origin.x;
    const originY = transform.origin.y;
    const sourceSizeWidth = this.sourceSizeWidth;
    const sourceSizeHeight = this.sourceSizeHeight;
    let x;
    let y;
    let width;
    let height;
    if (this.trimmed) {
      x = this.spriteSourceSizeX - originX * sourceSizeWidth;
      y = this.spriteSourceSizeY - originY * sourceSizeHeight;
      width = this.spriteSourceSizeWidth;
      height = this.spriteSourceSizeHeight;
    } else {
      x = -originX * sourceSizeWidth;
      y = -originY * sourceSizeHeight;
      width = sourceSizeWidth;
      height = sourceSizeHeight;
    }
    transform.setExtent(x, y, width, height);
    return this;
  }
  copyToVertices(vertices, offset = 0) {
    const {u0, u1, v0, v1} = this;
    vertices[offset + 0].setUV(u0, v0);
    vertices[offset + 1].setUV(u0, v1);
    vertices[offset + 2].setUV(u1, v1);
    vertices[offset + 3].setUV(u1, v0);
    return this;
  }
  updateUVs() {
    const {x, y, width, height} = this;
    const baseTextureWidth = this.texture.width;
    const baseTextureHeight = this.texture.height;
    this.u0 = x / baseTextureWidth;
    this.v0 = y / baseTextureHeight;
    this.u1 = (x + width) / baseTextureWidth;
    this.v1 = (y + height) / baseTextureHeight;
  }
  destroy() {
    this.texture = null;
  }
}
