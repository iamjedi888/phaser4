var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { CanvasTexture } from "../../textures/types/CanvasTexture";
import { RendererInstance } from "../../renderer/RendererInstance";
import { Sprite } from "../sprite/Sprite";
export class Text extends Sprite {
  constructor(x, y, text = "", font, fillStyle) {
    super(x, y, CanvasTexture());
    __publicField(this, "type", "Text");
    __publicField(this, "_text");
    __publicField(this, "preRenderCallback");
    __publicField(this, "wordWrapCallback");
    __publicField(this, "canvas");
    __publicField(this, "context");
    __publicField(this, "splitRegExp", /(?:\r\n|\r|\n)/);
    __publicField(this, "padding", { left: 0, right: 0, top: 0, bottom: 0 });
    __publicField(this, "verticalAlign", "ascent");
    __publicField(this, "lineSpacing", 0);
    __publicField(this, "resolution");
    __publicField(this, "font", "16px monospace");
    __publicField(this, "fillStyle", "#fff");
    __publicField(this, "strokeStyle", "");
    __publicField(this, "backgroundStyle", "");
    __publicField(this, "cornerRadius", 0);
    __publicField(this, "textAlign", "left");
    __publicField(this, "textBaseline", "alphabetic");
    __publicField(this, "lineWidth", 0);
    __publicField(this, "lineDash", []);
    __publicField(this, "fixedWidth");
    __publicField(this, "fixedHeight");
    __publicField(this, "antialias", false);
    this.texture.key = `Text${this.id}`;
    const renderer = RendererInstance.get();
    this.resolution = renderer.resolution;
    this.canvas = this.texture.image;
    this.context = this.canvas.getContext("2d");
    if (font) {
      this.font = font;
    }
    if (fillStyle) {
      this.fillStyle = fillStyle;
    }
    this.setText(text);
  }
  syncContext(canvas, ctx) {
    if (this.preRenderCallback) {
      this.preRenderCallback(canvas, ctx);
    }
    ctx.font = this.font;
    ctx.textBaseline = this.textBaseline;
    ctx.textAlign = this.textAlign;
    ctx.fillStyle = this.fillStyle;
    ctx.strokeStyle = this.strokeStyle;
    ctx.lineWidth = this.lineWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.setLineDash(this.lineDash);
    ctx.imageSmoothingEnabled = this.antialias;
  }
  updateText() {
    const canvas = this.canvas;
    const ctx = this.context;
    const resolution = this.resolution;
    const lines = this._text.split(this.splitRegExp);
    const padding = this.padding;
    const fillStyle = this.fillStyle;
    const strokeStyle = this.strokeStyle;
    const strokeWidth = this.lineWidth;
    const lineSpacing = this.lineSpacing;
    const strokeWidthHalf = strokeWidth > 0 ? strokeWidth / 2 : 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.syncContext(canvas, ctx);
    ctx.textAlign = "start";
    let maxWidth = 0;
    let maxHeight = 0;
    let y = 0;
    const lineMetrics = [];
    const vAlignAscent = this.verticalAlign === "ascent";
    const metrics = ctx.measureText("|M\xC9q");
    const averageLineHeight = Math.ceil(Math.abs(metrics.actualBoundingBoxAscent) + Math.abs(metrics.actualBoundingBoxDescent)) + strokeWidth;
    for (let i = 0; i < lines.length; i++) {
      const metrics2 = ctx.measureText(lines[i]);
      const left = metrics2.actualBoundingBoxLeft;
      const right = metrics2.actualBoundingBoxRight;
      let ascent = metrics2.actualBoundingBoxAscent;
      let descent = metrics2.actualBoundingBoxDescent;
      if (!ascent && !descent || lines[i] === "") {
        ascent = averageLineHeight;
        descent = 0;
      }
      const lineWidth = Math.ceil(Math.abs(left) + Math.abs(right)) + strokeWidth;
      const lineHeight = Math.ceil(Math.abs(ascent) + Math.abs(descent)) + strokeWidth;
      if (vAlignAscent) {
        y += ascent + strokeWidthHalf;
        if (i > 0) {
          y += lineSpacing + strokeWidthHalf;
        }
        maxHeight = y + descent + strokeWidthHalf;
      } else {
        y = maxHeight + (lineHeight - descent - strokeWidthHalf);
        maxHeight += lineHeight;
        if (i < lines.length - 1) {
          maxHeight += lineSpacing;
        }
      }
      maxWidth = Math.max(maxWidth, lineWidth);
      lineMetrics.push({ lineWidth, lineHeight, ascent, descent, left, right, y });
    }
    maxWidth += padding.left + padding.right;
    maxHeight += padding.top + padding.bottom;
    const displayWidth = this.fixedWidth ? this.fixedWidth : maxWidth;
    const displayHeight = this.fixedHeight ? this.fixedHeight : maxHeight;
    const canvasWidth = Math.ceil(displayWidth * resolution);
    const canvasHeight = Math.ceil(displayHeight * resolution);
    if (canvas.width !== canvasWidth || canvas.height !== canvasHeight) {
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      this.texture.setSize(displayWidth, displayHeight);
      this.size.set(displayWidth, displayHeight);
    }
    ctx.save();
    ctx.scale(resolution, resolution);
    this.syncContext(canvas, ctx);
    const backgroundStyle = this.backgroundStyle;
    if (backgroundStyle) {
      ctx.save();
      ctx.fillStyle = backgroundStyle;
      ctx.strokeStyle = backgroundStyle;
      const cornerRadius = this.cornerRadius;
      const halfRadius = cornerRadius > 0 ? cornerRadius / 2 : 0;
      if (cornerRadius) {
        ctx.lineWidth = cornerRadius;
        ctx.strokeRect(halfRadius, halfRadius, displayWidth - cornerRadius, displayHeight - cornerRadius);
      }
      ctx.fillRect(halfRadius, halfRadius, displayWidth - cornerRadius, displayHeight - cornerRadius);
      ctx.restore();
    }
    const textAlign = this.textAlign;
    const isCenter = textAlign === "center";
    const isRight = textAlign === "right" || textAlign === "end";
    const yOffset = (displayHeight - maxHeight) / 2 + padding.top;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const metrics2 = lineMetrics[i];
      let tx = padding.left + metrics2.left + strokeWidthHalf;
      const ty = yOffset + metrics2.y;
      if (isCenter) {
        tx = displayWidth / 2;
      } else if (isRight) {
        tx = displayWidth - strokeWidthHalf;
      }
      if (strokeStyle) {
        ctx.strokeText(line, tx, ty);
      }
      if (fillStyle) {
        ctx.fillText(line, tx, ty);
      }
    }
    ctx.restore();
    if (this.texture.binding) {
      this.texture.binding.update();
    }
    return this;
  }
  get text() {
    return this._text;
  }
  set text(value) {
    this.setText(value);
  }
  setText(value = "") {
    if (Array.isArray(value)) {
      value = value.join("\n");
    }
    if (value !== this._text) {
      this._text = value.toString();
      this.updateText();
    }
    return this;
  }
  destroy(reparentChildren) {
    this.texture.destroy();
    this.fillStyle = null;
    this.strokeStyle = null;
    this.backgroundStyle = null;
    this.canvas = null;
    this.context = null;
    super.destroy(reparentChildren);
  }
}
