var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { DeleteGLBuffer } from "./DeleteGLBuffer";
import { gl } from "../GL";
export class VertexBuffer {
  constructor(config = {}) {
    __publicField(this, "batchSize");
    __publicField(this, "dataSize");
    __publicField(this, "vertexElementSize");
    __publicField(this, "vertexByteSize");
    __publicField(this, "entryByteSize");
    __publicField(this, "bufferByteSize");
    __publicField(this, "data");
    __publicField(this, "vertexViewF32");
    __publicField(this, "vertexViewU32");
    __publicField(this, "vertexBuffer");
    __publicField(this, "indexed", false);
    __publicField(this, "isDynamic", false);
    __publicField(this, "count", 0);
    __publicField(this, "offset", 0);
    __publicField(this, "elementsPerEntry");
    __publicField(this, "isBound", false);
    const {
      batchSize = 1,
      dataSize = 4,
      isDynamic = true,
      elementsPerEntry = 4,
      vertexElementSize = 6
    } = config;
    this.batchSize = batchSize;
    this.dataSize = dataSize;
    this.vertexElementSize = vertexElementSize;
    this.isDynamic = isDynamic;
    this.elementsPerEntry = elementsPerEntry;
    this.vertexByteSize = vertexElementSize * dataSize;
    this.entryByteSize = this.vertexByteSize * elementsPerEntry;
    this.bufferByteSize = batchSize * this.entryByteSize;
    this.create();
  }
  resize(batchSize) {
    this.batchSize = batchSize;
    this.bufferByteSize = batchSize * this.entryByteSize;
    if (this.vertexBuffer) {
      DeleteGLBuffer(this.vertexBuffer);
    }
    this.create();
  }
  create() {
    const data = new ArrayBuffer(this.bufferByteSize);
    this.data = data;
    this.vertexViewF32 = new Float32Array(data);
    this.vertexViewU32 = new Uint32Array(data);
    this.vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    const type = this.isDynamic ? gl.DYNAMIC_DRAW : gl.STATIC_DRAW;
    gl.bufferData(gl.ARRAY_BUFFER, data, type);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    this.isBound = false;
  }
  add(count) {
    this.count += count;
    this.offset += this.vertexElementSize * count;
  }
  reset() {
    this.count = 0;
    this.offset = 0;
  }
  canContain(count) {
    return this.count + count <= this.batchSize;
  }
  free() {
    return Math.max(0, 1 - this.count / this.batchSize);
  }
  bind() {
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
  }
  destroy() {
    DeleteGLBuffer(this.vertexBuffer);
    this.data = null;
    this.vertexViewF32 = null;
    this.vertexViewU32 = null;
    this.vertexBuffer = null;
  }
}
