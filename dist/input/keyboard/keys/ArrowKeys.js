import {Key} from "../Key";
export class ArrowKeys {
  constructor(keyboardManager, config) {
    const {
      left = true,
      right = true,
      up = true,
      down = true,
      space = true
    } = config;
    const keys = keyboardManager.keys;
    if (left) {
      this.left = new Key("ArrowLeft");
      keys.set(this.left.value, this.left);
    }
    if (right) {
      this.right = new Key("ArrowRight");
      keys.set(this.right.value, this.right);
    }
    if (up) {
      this.up = new Key("ArrowUp");
      keys.set(this.up.value, this.up);
    }
    if (down) {
      this.down = new Key("ArrowDown");
      keys.set(this.down.value, this.down);
    }
    if (space) {
      this.space = new Key(" ");
      keys.set(this.space.value, this.space);
    }
  }
}
