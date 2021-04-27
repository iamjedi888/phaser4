import {DeleteGLBuffer} from "./DeleteGLBuffer";
import {VertexBuffer} from "./VertexBuffer";
import {gl} from "../GL";
export class IndexedVertexBuffer extends VertexBuffer {
  constructor(config = {}) {
    super(config);
    const {
      indexSize = 4,
      entryIndexSize = 6,
      indexLayout = null
    } = config;
    this.indexed = true;
    this.indexSize = indexSize;
    this.entryIndexSize = entryIndexSize;
    this.entryElementSize = this.vertexElementSize * this.elementsPerEntry;
    const seededIndexBuffer = [];
    if (indexLayout) {
      this.indexLayout = indexLayout;
      for (let i = 0; i < this.batchSize * indexSize; i += indexSize) {
        for (let c = 0; c < indexLayout.length; c++) {
          seededIndexBuffer.push(i + indexLayout[c]);
        }
      }
    }
    this.create();
    this.createIndexBuffer(seededIndexBuffer);
  }
  createIndexBuffer(seededIndex) {
    this.index = new Uint16Array(seededIndex);
    this.indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.index, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    seededIndex = [];
  }
  bind() {
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
  }
  destroy() {
    super.destroy();
    DeleteGLBuffer(this.indexBuffer);
    this.index = null;
    this.indexLayout = null;
    this.indexBuffer = null;
  }
}
