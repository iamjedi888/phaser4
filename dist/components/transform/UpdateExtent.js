import { Extent2DComponent } from "./Extent2DComponent";
import { SetDirtyTransform } from "../dirty";
import { Transform2DComponent } from "./Transform2DComponent";
export function UpdateExtent(id, width, height) {
  const x = -Transform2DComponent.originX[id] * width;
  const y = -Transform2DComponent.originY[id] * height;
  Extent2DComponent.x[id] = x;
  Extent2DComponent.y[id] = y;
  Extent2DComponent.width[id] = width;
  Extent2DComponent.height[id] = height;
  Extent2DComponent.right[id] = x + width;
  Extent2DComponent.bottom[id] = y + height;
  SetDirtyTransform(id);
}
