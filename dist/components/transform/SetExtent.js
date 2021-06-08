import { Extent2DComponent } from "./Extent2DComponent";
import { SetDirtyTransform } from "../dirty";
export function SetExtent(id, x, y, width, height) {
  Extent2DComponent.x[id] = x;
  Extent2DComponent.y[id] = y;
  Extent2DComponent.width[id] = width;
  Extent2DComponent.height[id] = height;
  Extent2DComponent.right[id] = x + width;
  Extent2DComponent.bottom[id] = y + height;
  SetDirtyTransform(id);
}
