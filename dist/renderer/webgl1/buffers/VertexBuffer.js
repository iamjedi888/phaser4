import {DeleteGLBuffer} from "./DeleteGLBuffer";
import {gl} from "../GL";
export class VertexBuffer {
  constructor(config = {}) {
    this.indexed = false;
    this.isDynamic = false;
    this.count = 0;
    this.offset = 0;
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
