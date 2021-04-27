import {Key} from "../Key";
export class WASDKeys {
  constructor(keyboardManager, config) {
    const {
      W = true,
      A = true,
      S = true,
      D = true,
      space = true
    } = config;
    const keys = keyboardManager.keys;
    if (W) {
      this.W = new Key("w");
      keys.set(this.W.value, this.W);
    }
    if (A) {
      this.A = new Key("a");
      keys.set(this.A.value, this.A);
    }
    if (S) {
      this.S = new Key("s");
      keys.set(this.S.value, this.S);
    }
    if (D) {
      this.D = new Key("d");
      keys.set(this.D.value, this.D);
    }
    if (space) {
      this.space = new Key(" ");
      keys.set(this.space.value, this.space);
    }
  }
}
