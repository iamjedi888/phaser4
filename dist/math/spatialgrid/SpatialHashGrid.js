var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { GetLocalBounds } from "../../components/transform/GetLocalBounds";
export class SpatialHashGrid {
  constructor(cellWidth, cellHeight, getBounds = GetLocalBounds) {
    __publicField(this, "cellWidth");
    __publicField(this, "cellHeight");
    __publicField(this, "cells");
    __publicField(this, "ids");
    __publicField(this, "index");
    __publicField(this, "getBounds");
    this.cellWidth = Math.abs(cellWidth);
    this.cellHeight = Math.abs(cellHeight);
    this.cells = new Map();
    this.ids = [];
    this.index = 0;
    this.getBounds = getBounds;
  }
  clear() {
    this.cells.forEach((cell) => cell.clear());
    this.cells.clear();
    this.ids = [];
    this.index = 0;
  }
  getX(x) {
    return Math.floor(x / this.cellWidth);
  }
  getY(y) {
    return Math.floor(y / this.cellHeight);
  }
  getXCeil(x) {
    return Math.ceil(x / this.cellWidth);
  }
  getYCeil(y) {
    return Math.ceil(y / this.cellHeight);
  }
  getKey(x, y) {
    return `${this.getX(x)} ${this.getY(y)}`;
  }
  getGridKey(x, y) {
    return `${x} ${y}`;
  }
  addToCell(id, gridX, gridY) {
    const cells = this.cells;
    const key = this.getGridKey(gridX, gridY);
    if (cells.has(key)) {
      cells.get(key).add(id);
    } else {
      cells.set(key, new Set([id]));
    }
    return key;
  }
  inView(x, y, width, height) {
    return this.intersects(x, y, x + width, y + height);
  }
  intersects(left, top, right, bottom) {
    const topLeftX = this.getX(left);
    const topLeftY = this.getY(top);
    const bottomRightX = this.getX(right);
    const bottomRightY = this.getY(bottom);
    const cells = this.cells;
    let results = [];
    if (topLeftX === bottomRightX && topLeftY === bottomRightY) {
      const key = this.getGridKey(topLeftX, topLeftY);
      if (cells.has(key)) {
        results = [...cells.get(key)];
      }
    } else {
      const width = bottomRightX - topLeftX + 1;
      const height = bottomRightY - topLeftY + 1;
      let gridX = topLeftX;
      let gridY = topLeftY;
      let placed = 0;
      for (let i = 0; i < width * height; i++) {
        const key = this.getGridKey(gridX, gridY);
        if (cells.has(key)) {
          results = results.concat(...cells.get(key));
        }
        gridX++;
        placed++;
        if (placed === width) {
          gridX = topLeftX;
          gridY++;
          placed = 0;
        }
      }
    }
    const ids = this.ids;
    results.sort((a, b) => {
      return ids[a] - ids[b];
    });
    return new Set(results);
  }
  add(id) {
    const { left, top, right, bottom } = this.getBounds(id);
    const topLeftX = this.getX(left);
    const topLeftY = this.getY(top);
    const bottomRightX = this.getXCeil(right);
    const bottomRightY = this.getYCeil(bottom);
    const width = bottomRightX - topLeftX;
    const height = bottomRightY - topLeftY;
    this.ids[id] = this.index++;
    if (width === 1 && height === 1) {
      this.addToCell(id, topLeftX, topLeftY);
      return;
    }
    let gridX = topLeftX;
    let gridY = topLeftY;
    let placed = 0;
    for (let i = 0; i < width * height; i++) {
      this.addToCell(id, gridX, gridY);
      gridX++;
      placed++;
      if (placed === width) {
        gridX = topLeftX;
        gridY++;
        placed = 0;
      }
    }
  }
  update(id) {
    this.remove(id);
    this.add(id);
  }
  has(id) {
    return !!this.ids[id];
  }
  getAll() {
    return this.ids.filter((index, id) => id !== void 0);
  }
  remove(id) {
    if (this.has(id)) {
      this.cells.forEach((cell) => cell.delete(id));
      this.ids[id] = void 0;
    }
  }
}
