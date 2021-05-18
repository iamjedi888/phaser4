import {DIRTY_CONST} from "../DIRTY_CONST";
import {GameObject} from "../GameObject";
export class Container extends GameObject {
  constructor(x = 0, y = 0) {
    super(x, y);
    this._alpha = 1;
    this.type = "Container";
  }
  get alpha() {
    return this._alpha;
  }
  set alpha(value) {
    if (value !== this._alpha) {
      this._alpha = value;
      this.vertices.forEach((vertex) => {
        vertex.setAlpha(value);
      });
      this.setDirty(DIRTY_CONST.COLORS);
    }
  }
}
