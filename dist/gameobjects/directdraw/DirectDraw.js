var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { DrawFrame } from "../../renderer/webgl1/draw/DrawFrame";
import { DrawImage } from "../../renderer/webgl1/draw/DrawImage";
import { DrawImagePart } from "../../renderer/webgl1/draw/DrawImagePart";
import { DrawQuad } from "../../renderer/webgl1/draw/DrawQuad";
import { DrawTiles } from "../../renderer/webgl1/draw/DrawTiles";
import { FillArc } from "../../renderer/webgl1/draw/FillArc";
import { FillLine } from "../../renderer/webgl1/draw/FillLine";
import { FillRect } from "../../renderer/webgl1/draw/FillRect";
import { FillTriangle } from "../../renderer/webgl1/draw/FillTriangle";
import { GameObject } from "../GameObject";
export class DirectDraw extends GameObject {
  constructor() {
    super();
    __publicField(this, "type", "DirectDraw");
    __publicField(this, "red", 1);
    __publicField(this, "green", 1);
    __publicField(this, "blue", 1);
    __publicField(this, "alpha", 1);
    __publicField(this, "smoothness", 8);
    __publicField(this, "renderPass");
    __publicField(this, "_color");
  }
  set color(value) {
    if (value !== void 0 && value !== this._color) {
      this.red = (value >> 16 & 255) / 255;
      this.green = (value >> 8 & 255) / 255;
      this.blue = (value & 255) / 255;
      this._color = value;
    }
  }
  setRGB(red, green, blue, alpha = 1) {
    this.red = red / 255;
    this.green = green / 255;
    this.blue = blue / 255;
    this.alpha = alpha;
    return this;
  }
  arc(x, y, radius, startAngle = 0, endAngle = 6.283185307179586, anticlockwise = false, includeCenter = false, color) {
    this.color = color;
    FillArc(this.renderPass, x, y, radius, startAngle, endAngle, this.smoothness, anticlockwise, includeCenter, this.red, this.green, this.blue, this.alpha);
    return this;
  }
  circle(x, y, radius, color) {
    this.color = color;
    FillArc(this.renderPass, x, y, radius, 0, Math.PI * 2, this.smoothness, false, false, this.red, this.green, this.blue, this.alpha);
    return this;
  }
  plot(x, y, color) {
    this.color = color;
    FillRect(this.renderPass, x, y, 1, 1, this.red, this.green, this.blue, this.alpha);
    return this;
  }
  box(x, y, width, height, thickness = 1, color) {
    this.color = color;
    const tw = thickness * 0.5;
    this.line(x, y + tw, x + width, y + tw, thickness);
    this.line(x, y + height - tw, x + width, y + height - tw, thickness);
    this.line(x + tw, y + thickness, x + tw, y + height - thickness, thickness);
    this.line(x + width - tw, y + thickness, x + width - tw, y + height - thickness, thickness);
    return this;
  }
  rect(x, y, width, height, color) {
    this.color = color;
    FillRect(this.renderPass, x, y, width, height, this.red, this.green, this.blue, this.alpha);
    return this;
  }
  triangle(x1, y1, x2, y2, x3, y3, color) {
    this.color = color;
    FillTriangle(this.renderPass, x1, y1, x2, y2, x3, y3, this.red, this.green, this.blue, this.alpha);
    return this;
  }
  line(x1, y1, x2, y2, width, color) {
    this.color = color;
    FillLine(this.renderPass, x1, y1, x2, y2, width, this.red, this.green, this.blue, this.alpha);
    return this;
  }
  image(texture, x, y, alpha = 1, scaleX = 1, scaleY = 1) {
    DrawImage(this.renderPass, texture, x, y, alpha, scaleX, scaleY);
    return this;
  }
  imagePart(texture, x0, y0, x1, y1, dx, dy, dw, dh, alpha = 1) {
    DrawImagePart(this.renderPass, texture, x0, y0, x1, y1, dx, dy, dw, dh, alpha);
    return this;
  }
  frame(texture, frame, x, y, alpha = 1, scaleX = 1, scaleY = 1) {
    DrawFrame(this.renderPass, texture, frame, x, y, alpha, scaleX, scaleY);
    return this;
  }
  quad(texture, frame, x0, y0, x1, y1, x2, y2, x3, y3, alpha = 1) {
    DrawQuad(this.renderPass, texture, frame, x0, y0, x1, y1, x2, y2, x3, y3, alpha);
    return this;
  }
  tiles(texture, tileWidth, tileHeight, mapData, mapWidth, x = 0, y = 0) {
    DrawTiles(this.renderPass, texture, tileWidth, tileHeight, mapData, mapWidth, x, y, this.alpha);
    return this;
  }
  render() {
  }
  renderGL(renderPass) {
    this.renderPass = renderPass;
    this.render();
  }
}
