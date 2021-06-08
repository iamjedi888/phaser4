import { GameObject } from "../GameObject";
export class Layer extends GameObject {
  constructor() {
    super();
    this.passthru = true;
    this.willRender = false;
  }
}
