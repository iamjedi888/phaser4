var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { ClearDirtyDisplayList } from "../../components/dirty/ClearDirtyDisplayList";
import { GameObject } from "../GameObject";
import { GameObjectCache } from "../GameObjectCache";
import { GetWorldID } from "../../components/hierarchy/GetWorldID";
import { HasDirtyTransform } from "../../components/dirty/HasDirtyTransform";
import { SetCustomDisplayList } from "../../components/permissions/SetCustomDisplayList";
import { SetDirtyChildColor } from "../../components/dirty/SetDirtyChildColor";
import { SetDirtyChildTransform } from "../../components/dirty/SetDirtyChildTransform";
import { SetDirtyDisplayList } from "../../components/dirty/SetDirtyDisplayList";
import { SetWillTransformChildren } from "../../components/permissions/SetWillTransformChildren";
import { SetWillUpdateChildren } from "../../components/permissions/SetWillUpdateChildren";
import { SpatialHashGrid } from "../../math/spatialgrid/SpatialHashGrid";
export class SpatialGridLayer extends GameObject {
  constructor(cellWidth = 512, cellHeight = 512, updateChildren = false) {
    super();
    __publicField(this, "type", "SpatialGridLayer");
    __publicField(this, "hash");
    __publicField(this, "onSortChildren");
    this.hash = new SpatialHashGrid(cellWidth, cellHeight);
    const id = this.id;
    SetCustomDisplayList(id, true);
    SetWillTransformChildren(id, false);
    SetWillUpdateChildren(id, updateChildren);
  }
  getChildren(renderPass) {
    ClearDirtyDisplayList(this.id);
    const camera = renderPass.current2DCamera;
    const cx = camera.getBoundsX();
    const cy = camera.getBoundsY();
    const cright = camera.getBoundsRight();
    const cbottom = camera.getBoundsBottom();
    const childIDs = this.hash.intersects(cx, cy, cright, cbottom);
    const result = [];
    childIDs.forEach((id) => {
      result.push(GameObjectCache.get(id));
    });
    if (this.onSortChildren) {
      result.sort(this.onSortChildren);
    }
    return result;
  }
  onAddChild(childID) {
    if (!HasDirtyTransform(childID)) {
      this.hash.add(childID);
    }
    const worldID = GetWorldID(this.id);
    SetDirtyDisplayList(this.id);
    SetDirtyChildTransform(worldID);
    SetDirtyChildColor(worldID);
  }
  onUpdateChild(childID) {
    this.hash.update(childID);
  }
  onRemoveChild(childID) {
    this.hash.remove(childID);
    SetDirtyDisplayList(this.id);
  }
  destroy(reparentChildren) {
    this.hash.clear();
    super.destroy(reparentChildren);
  }
}
