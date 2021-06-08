import { SetSize } from "./SetSize";
export function Size(width = 800, height = 600, resolution = 1) {
  return () => {
    SetSize(width, height, resolution);
  };
}
