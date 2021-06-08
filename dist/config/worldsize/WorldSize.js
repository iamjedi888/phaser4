import { SetWorldSize } from "./SetWorldSize";
export function WorldSize(size) {
  return () => {
    SetWorldSize(size);
  };
}
