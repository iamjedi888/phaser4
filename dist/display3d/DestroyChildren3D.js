import { RemoveChildren3DBetween } from "./RemoveChildren3DBetween";
export function DestroyChildren3D(parent, beginIndex = 0, endIndex) {
  const removed = RemoveChildren3DBetween(parent, beginIndex, endIndex);
  removed.forEach((child) => {
    child.destroy();
  });
}
