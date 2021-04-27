import {GetBufferFromVertexSet} from "./GetBufferFromVertexSet";
export class Geometry {
  constructor(data) {
    if (data) {
      if (data.hasOwnProperty("vertices")) {
        this.buffer = GetBufferFromVertexSet(data);
      } else {
        this.buffer = data;
      }
    }
  }
  destroy() {
    this.buffer.destroy();
  }
}
