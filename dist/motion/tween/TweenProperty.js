var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
export class TweenProperty {
  constructor(name, end) {
    __publicField(this, "name");
    __publicField(this, "start");
    __publicField(this, "end");
    __publicField(this, "modifier");
    this.name = name;
    if (typeof end === "string") {
      this.modifier = end.substr(0, 1);
      this.end = parseFloat(end.substring(1));
    } else {
      this.end = end;
    }
  }
  getEnd(start) {
    const modifier = this.modifier;
    const end = this.end;
    if (modifier === "+") {
      return start + end;
    } else if (modifier === "-") {
      return start - end;
    } else {
      return end;
    }
  }
  to(target) {
    const current = target[this.name];
    const end = this.getEnd(current);
    this.start = current;
    this.end = end;
  }
  from(target) {
    const current = target[this.name];
    const end = this.getEnd(current);
    this.start = end;
    this.end = current;
    target[this.name] = end;
  }
  update(target, v) {
    target[this.name] = this.start + (this.end - this.start) * v;
  }
}
